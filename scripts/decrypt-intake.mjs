#!/usr/bin/env node
/**
 * Intake decrypt/utility script
 *
 * Modes:
 *   --gen-org-identity <path>     Generate org identity, save to file, print public keys
 *   --dump-latest --db-local --out <path>   Export latest encrypted envelope from local D1
 *   <org.identity.json> <encrypted.json|->  Decrypt envelope using org identity
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Dynamic import for pqc-shared to handle both modes
async function getPqcShared() {
  return await import("@omnituum/pqc-shared");
}

function usage() {
  console.error(`Usage:
  node scripts/decrypt-intake.mjs --gen-org-identity <path>
  node scripts/decrypt-intake.mjs --print-pub <path>
  node scripts/decrypt-intake.mjs --dump-latest --db-local --out <path>
  node scripts/decrypt-intake.mjs <org.identity.json> <encrypted.json or ->`);
  process.exit(1);
}

// ============================================================================
// Identity normalization membrane
// ============================================================================
/**
 * Normalize org identity to flat format expected by hybridDecrypt/hybridEncrypt.
 * Accepts either nested or flat input.
 *
 * Nested input:
 *   { x25519: { publicHex, secretHex }, kyber: { publicB64, secretB64 } }
 *
 * Flat input:
 *   { x25519PubHex, x25519SecHex, kyberPubB64, kyberSecB64 }
 *
 * Output (flat, canonical):
 *   { x25519PubHex, x25519SecHex, kyberPubB64, kyberSecB64 }
 */
function normalizeOrgIdentity(raw) {
  let flat;

  // Detect nested vs flat
  if (raw.x25519 && typeof raw.x25519 === "object") {
    // Nested format
    flat = {
      x25519PubHex: raw.x25519.publicHex?.replace(/^0x/, ""),
      x25519SecHex: raw.x25519.secretHex?.replace(/^0x/, ""),
      kyberPubB64: raw.kyber?.publicB64,
      kyberSecB64: raw.kyber?.secretB64,
    };
  } else {
    // Already flat (or close to it)
    flat = {
      x25519PubHex: (raw.x25519PubHex ?? raw.x25519PublicHex)?.replace(/^0x/, ""),
      x25519SecHex: (raw.x25519SecHex ?? raw.x25519SecretHex)?.replace(/^0x/, ""),
      kyberPubB64: raw.kyberPubB64 ?? raw.kyberPublicB64,
      kyberSecB64: raw.kyberSecB64 ?? raw.kyberSecretB64,
    };
  }

  // Validate required fields
  const missing = [];
  if (!flat.x25519PubHex) missing.push("x25519PubHex");
  if (!flat.x25519SecHex) missing.push("x25519SecHex");
  if (!flat.kyberPubB64) missing.push("kyberPubB64");
  if (!flat.kyberSecB64) missing.push("kyberSecB64");

  if (missing.length > 0) {
    const found = Object.keys(raw).join(", ");
    throw new Error(
      `Identity missing required fields: ${missing.join(", ")}\n` +
      `  Found keys: ${found}`
    );
  }

  return flat;
}

// ============================================================================
// Mode: Generate org identity
// ============================================================================
async function genOrgIdentity(outPath) {
  const pqc = await getPqcShared();

  // Generate keys individually (Kyber is async)
  const x25519 = pqc.generateX25519Keypair();
  const kyber = await pqc.generateKyberKeypair();

  // Build identity in canonical flat format
  const identity = {
    x25519PubHex: x25519.publicHex.replace(/^0x/, ""),
    x25519SecHex: x25519.secretHex.replace(/^0x/, ""),
    kyberPubB64: kyber.publicB64,
    kyberSecB64: kyber.secretB64,
  };

  // Ensure directory exists
  const dir = path.dirname(outPath);
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write identity (contains private keys - never print)
  fs.writeFileSync(outPath, JSON.stringify(identity, null, 2));
  console.error(`✓ Org identity saved to: ${outPath}`);
  console.error(`  (contains private keys - do NOT commit)\n`);

  // Print public keys in env var format
  printPubKeys(identity);
}

// ============================================================================
// Mode: Print public keys from existing identity
// ============================================================================
function printPubKeys(identity) {
  console.log(`VITE_OMNITUUM_X25519_PUB_HEX=${identity.x25519PubHex}`);
  console.log(`VITE_OMNITUUM_KYBER_PUB_B64=${identity.kyberPubB64}`);
}

async function printPub(identityPath) {
  if (!fs.existsSync(identityPath)) {
    console.error(`✘ Identity file not found: ${identityPath}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const identity = normalizeOrgIdentity(raw);
  printPubKeys(identity);
}

// ============================================================================
// Mode: Dump latest encrypted envelope from local D1
// ============================================================================
async function dumpLatest(outPath) {
  // Find the D1 sqlite file that has data
  const d1Dir = path.join(PROJECT_ROOT, ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");

  if (!fs.existsSync(d1Dir)) {
    console.error(`✘ D1 directory not found: ${d1Dir}`);
    console.error(`  Run 'pnpm dev:pages' first to initialize local D1.`);
    process.exit(1);
  }

  // Dynamic import for better-sqlite3 (needs to be installed or use native sqlite3)
  let Database;
  try {
    const betterSqlite = await import("better-sqlite3");
    Database = betterSqlite.default;
  } catch {
    console.error(`✘ better-sqlite3 not available. Using sqlite3 CLI fallback.`);
    return dumpLatestViaCli(d1Dir, outPath);
  }

  // Find sqlite files and look for one with data
  const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith(".sqlite") && !f.includes("-shm") && !f.includes("-wal"));

  let latestRow = null;
  let sourceFile = null;

  for (const file of sqliteFiles) {
    const dbPath = path.join(d1Dir, file);
    try {
      const db = new Database(dbPath, { readonly: true });
      const row = db.prepare(`
        SELECT encrypted_json, received_at FROM intake_requests
        ORDER BY received_at DESC LIMIT 1
      `).get();
      db.close();

      if (row && (!latestRow || row.received_at > latestRow.received_at)) {
        latestRow = row;
        sourceFile = file;
      }
    } catch {
      // Skip files that don't have the table
    }
  }

  if (!latestRow) {
    console.error(`✘ No intake_requests found in any D1 database.`);
    console.error(`  Submit a form first via the running dev server.`);
    process.exit(1);
  }

  // Ensure output directory exists
  const outDir = path.dirname(outPath);
  if (outDir && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Write the encrypted_json (which is the encrypted envelope as a JSON string)
  fs.writeFileSync(outPath, latestRow.encrypted_json);
  console.error(`✓ Exported latest envelope to: ${outPath}`);
  console.error(`  Source: ${sourceFile}`);
  console.error(`  Received: ${latestRow.received_at}`);
}

// Fallback: use sqlite3 CLI
async function dumpLatestViaCli(d1Dir, outPath) {
  const { execSync } = await import("node:child_process");

  const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith(".sqlite") && !f.includes("-shm") && !f.includes("-wal"));

  let latestRow = null;
  let sourceFile = null;

  for (const file of sqliteFiles) {
    const dbPath = path.join(d1Dir, file);
    try {
      const result = execSync(
        `sqlite3 "${dbPath}" "SELECT encrypted_json, received_at FROM intake_requests ORDER BY received_at DESC LIMIT 1;"`,
        { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
      ).trim();

      if (result) {
        // sqlite3 outputs pipe-separated by default
        const parts = result.split("|");
        if (parts.length >= 2) {
          const row = { encrypted_json: parts[0], received_at: parts[1] };
          if (!latestRow || row.received_at > latestRow.received_at) {
            latestRow = row;
            sourceFile = file;
          }
        }
      }
    } catch {
      // Skip files that don't have the table
    }
  }

  if (!latestRow) {
    console.error(`✘ No intake_requests found in any D1 database.`);
    console.error(`  Submit a form first via the running dev server.`);
    process.exit(1);
  }

  const outDir = path.dirname(outPath);
  if (outDir && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outPath, latestRow.encrypted_json);
  console.error(`✓ Exported latest envelope to: ${outPath}`);
  console.error(`  Source: ${sourceFile}`);
  console.error(`  Received: ${latestRow.received_at}`);
}

// ============================================================================
// Mode: Decrypt
// ============================================================================
async function decrypt(orgPath, encPath) {
  const pqc = await getPqcShared();

  if (!fs.existsSync(orgPath)) {
    console.error(`✘ Org identity not found: ${orgPath}`);
    console.error(`  Generate one with: node scripts/decrypt-intake.mjs --gen-org-identity ${orgPath}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(orgPath, "utf8"));
  const identity = normalizeOrgIdentity(raw);

  const encRaw =
    encPath === "-"
      ? fs.readFileSync(0, "utf8") // stdin
      : fs.readFileSync(encPath, "utf8");

  // Parse the encrypted envelope
  let encrypted;
  try {
    const envelope = JSON.parse(encRaw);
    // Support either:
    // - body.encrypted (intake wrapper)
    // - the encrypted envelope itself
    encrypted = envelope?.encrypted ?? envelope;

    // If encrypted is a string, it might be double-encoded
    if (typeof encrypted === "string") {
      encrypted = JSON.parse(encrypted);
    }
  } catch {
    // Try as raw envelope
    encrypted = JSON.parse(encRaw);
  }

  // Pass flat secretKeys format expected by hybridDecrypt
  const secretKeys = {
    x25519SecHex: identity.x25519SecHex,
    kyberSecB64: identity.kyberSecB64,
  };
  const plaintext = await pqc.hybridDecryptToString(encrypted, secretKeys);
  console.log(plaintext);
}

// ============================================================================
// Main
// ============================================================================
const args = process.argv.slice(2);

if (args[0] === "--gen-org-identity") {
  const outPath = args[1];
  if (!outPath) {
    console.error("✘ Missing output path for org identity");
    usage();
  }
  await genOrgIdentity(outPath);
} else if (args[0] === "--print-pub") {
  const identityPath = args[1];
  if (!identityPath) {
    console.error("✘ Missing identity path");
    usage();
  }
  await printPub(identityPath);
} else if (args[0] === "--dump-latest") {
  let outPath = null;
  let dbLocal = false;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--db-local") {
      dbLocal = true;
    } else if (args[i] === "--out" && args[i + 1]) {
      outPath = args[++i];
    }
  }

  if (!dbLocal) {
    console.error("✘ --dump-latest requires --db-local");
    usage();
  }
  if (!outPath) {
    console.error("✘ --dump-latest requires --out <path>");
    usage();
  }

  await dumpLatest(outPath);
} else if (args.length >= 2) {
  await decrypt(args[0], args[1]);
} else {
  usage();
}
