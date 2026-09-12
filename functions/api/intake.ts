/**
 * POST /api/intake - Encrypted intake submission endpoint
 *
 * Accepts encrypted form submissions, stores ciphertext only.
 * Server never sees plaintext PII.
 */

interface Env {
  DB: D1Database;
  INTAKE_IP_SALT?: string;
  ALLOWED_ORIGINS?: string;
  /** Optional KV namespace used for per-IP rate limiting. Absent in local dev. */
  INTAKE_RATE?: KVNamespace;
}

// Rate limit: submissions allowed per IP per window.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;

interface IntakeEnvelope {
  v: string;
  id: string;
  encrypted: string;
}

// Allowed envelope versions
const ALLOWED_VERSIONS = new Set(["loggie.intake.v1"]);

// Max body size (64KB should be plenty for encrypted form data)
const MAX_BODY_SIZE = 64 * 1024;

// Max encrypted payload size (256KB)
const MAX_ENCRYPTED_SIZE = 256 * 1024;

// BLAKE3 hex output is 64 chars
const BLAKE3_HEX_LENGTH = 64;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS preflight is handled by onRequestOptions
  const corsHeaders = getCorsHeaders(request, env.ALLOWED_ORIGINS);

  // An Origin that is not on the allow-list is refused outright. The previous
  // implementation echoed allowed[0] back and then processed the POST anyway,
  // which meant the allow-list constrained only the response header, not who
  // could write to the table.
  if (!isOriginAllowed(request, env.ALLOWED_ORIGINS)) {
    return jsonResponse({ ok: false, error: "Origin not allowed" }, 403, corsHeaders);
  }

  try {
    // Size check
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return jsonResponse({ ok: false, error: "Payload too large" }, 413, corsHeaders);
    }

    // Parse body
    let body: IntakeEnvelope;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON" }, 400, corsHeaders);
    }

    // Validate envelope
    const validation = validateEnvelope(body);
    if (!validation.ok) {
      return jsonResponse({ ok: false, error: validation.error }, 400, corsHeaders);
    }

    // Honeypot. The browser form ships an off-screen "website" field that a
    // person never fills in. If the client puts it on the envelope, a non-empty
    // value is a bot and the submission is dropped — with a 201 so the bot
    // cannot distinguish rejection from success.
    if (typeof (body as { hp?: unknown }).hp === "string" && (body as { hp: string }).hp.length > 0) {
      return jsonResponse({ ok: true, id: body.id, status: "created" }, 201, corsHeaders);
    }

    // Capture metadata
    const ua = request.headers.get("user-agent") || null;
    const ref = request.headers.get("referer") || null;
    const ip = request.headers.get("cf-connecting-ip") || null;
    const ipHash = ip && env.INTAKE_IP_SALT
      ? await hashIp(ip, env.INTAKE_IP_SALT)
      : null;

    // Per-IP rate limit. Requires an INTAKE_RATE KV binding; when it is absent
    // (local dev) the endpoint runs unlimited, which is why the binding must be
    // configured before this takes public traffic.
    if (env.INTAKE_RATE && ipHash) {
      const key = `rl:${ipHash}`;
      const seen = parseInt((await env.INTAKE_RATE.get(key)) || "0", 10);
      if (seen >= RATE_LIMIT_MAX) {
        return jsonResponse(
          { ok: false, error: "Too many submissions. Try again later." },
          429,
          corsHeaders
        );
      }
      await env.INTAKE_RATE.put(key, String(seen + 1), {
        expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
      });
    }

    // Insert into D1
    const receivedAt = new Date().toISOString();

    try {
      await env.DB.prepare(`
        INSERT INTO intake_requests (id, v, encrypted_json, received_at, ip_hash, ua, ref)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        body.id,
        body.v,
        body.encrypted,
        receivedAt,
        ipHash,
        ua,
        ref
      ).run();

      return jsonResponse({ ok: true, id: body.id, status: "created" }, 201, corsHeaders);
    } catch (err: unknown) {
      // Check for duplicate (UNIQUE constraint violation)
      if (err instanceof Error && err.message.includes("UNIQUE constraint failed")) {
        return jsonResponse({ ok: true, id: body.id, status: "duplicate" }, 200, corsHeaders);
      }
      // Other DB error
      console.error("D1 insert error:", err);
      return jsonResponse({ ok: false, error: "Storage error" }, 500, corsHeaders);
    }
  } catch (err) {
    console.error("Intake handler error:", err);
    return jsonResponse({ ok: false, error: "Internal error" }, 500, corsHeaders);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  const corsHeaders = getCorsHeaders(context.request, context.env.ALLOWED_ORIGINS);
  if (!isOriginAllowed(context.request, context.env.ALLOWED_ORIGINS)) {
    return new Response(null, { status: 403, headers: corsHeaders });
  }
  return new Response(null, { status: 204, headers: corsHeaders });
};

/**
 * True when the request may write. With no ALLOWED_ORIGINS configured the
 * endpoint is open (local dev). With it configured, only the listed origins —
 * and same-origin requests, which carry no Origin header — are allowed.
 */
function isOriginAllowed(request: Request, allowedOrigins?: string): boolean {
  if (!allowedOrigins) return true;
  const allowed = allowedOrigins.split(",").map(o => o.trim()).filter(Boolean);
  if (allowed.includes("*")) return true;
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin form post
  return allowed.includes(origin);
}

function validateEnvelope(body: unknown): { ok: true } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Missing body" };
  }

  const envelope = body as Record<string, unknown>;

  // Version check
  if (typeof envelope.v !== "string" || !ALLOWED_VERSIONS.has(envelope.v)) {
    return { ok: false, error: "Invalid or unsupported version" };
  }

  // ID check (BLAKE3 hex)
  if (typeof envelope.id !== "string" || envelope.id.length !== BLAKE3_HEX_LENGTH) {
    return { ok: false, error: "Invalid request ID" };
  }
  if (!/^[a-f0-9]+$/.test(envelope.id)) {
    return { ok: false, error: "Invalid request ID format" };
  }

  // Encrypted payload check
  if (typeof envelope.encrypted !== "string" || envelope.encrypted.length === 0) {
    return { ok: false, error: "Missing encrypted payload" };
  }
  if (envelope.encrypted.length > MAX_ENCRYPTED_SIZE) {
    return { ok: false, error: "Encrypted payload too large" };
  }

  return { ok: true };
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function getCorsHeaders(request: Request, allowedOrigins?: string): Headers {
  const origin = request.headers.get("origin") || "";
  const headers = new Headers();

  // Determine if origin is allowed
  let allowOrigin = "*";
  if (allowedOrigins) {
    const allowed = allowedOrigins.split(",").map(o => o.trim());
    if (allowed.includes("*")) {
      allowOrigin = "*";
    } else if (allowed.includes(origin)) {
      allowOrigin = origin;
    } else {
      // Not on the list. Echo nothing usable back — never allowed[0], which
      // handed a stranger a header naming an origin they are not.
      allowOrigin = "null";
    }
  }

  headers.set("Access-Control-Allow-Origin", allowOrigin);
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  if (allowedOrigins) {
    headers.set("Vary", "Origin");
  }

  return headers;
}

function jsonResponse(data: unknown, status: number, headers: Headers): Response {
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(data), { status, headers });
}
