#!/usr/bin/env node
/**
 * E2E test for intake encryption/decryption
 *
 * Verifies:
 * - Envelope format compatibility
 * - Identity membrane normalization
 * - Kyber (post-quantum) decrypt path
 *
 * Usage: node scripts/test-e2e-intake.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const VECTORS_DIR = path.join(PROJECT_ROOT, "test-vectors");
const IDENTITY_PATH = path.join(VECTORS_DIR, "org.identity.test.json");
const ENCRYPTED_PATH = path.join(VECTORS_DIR, "encrypted.test.json");
const PLAINTEXT_PATH = path.join(VECTORS_DIR, "plaintext.test.json");

function fail(msg) {
  console.error(`✘ ${msg}`);
  process.exit(1);
}

function pass(msg) {
  console.log(`✓ ${msg}`);
}

// Check fixtures exist
if (!fs.existsSync(IDENTITY_PATH)) fail(`Missing test identity: ${IDENTITY_PATH}`);
if (!fs.existsSync(ENCRYPTED_PATH)) fail(`Missing test envelope: ${ENCRYPTED_PATH}`);
if (!fs.existsSync(PLAINTEXT_PATH)) fail(`Missing expected plaintext: ${PLAINTEXT_PATH}`);

// Run decrypt
let decrypted;
try {
  const result = execSync(
    `node scripts/decrypt-intake.mjs "${IDENTITY_PATH}" "${ENCRYPTED_PATH}"`,
    { cwd: PROJECT_ROOT, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
  );
  // Extract JSON from output (skip [Hybrid] log line)
  const lines = result.trim().split("\n");
  const jsonStart = lines.findIndex(l => l.startsWith("{"));
  if (jsonStart === -1) fail("No JSON in decrypt output");
  decrypted = JSON.parse(lines.slice(jsonStart).join("\n"));
} catch (err) {
  fail(`Decrypt failed: ${err.stderr || err.message}`);
}

// Load expected
const expected = JSON.parse(fs.readFileSync(PLAINTEXT_PATH, "utf8"));

// Deep equality check
const decryptedStr = JSON.stringify(decrypted, Object.keys(decrypted).sort());
const expectedStr = JSON.stringify(expected, Object.keys(expected).sort());

if (decryptedStr !== expectedStr) {
  console.error("Expected:", expectedStr);
  console.error("Got:", decryptedStr);
  fail("Decrypted payload does not match expected");
}

pass("Envelope format valid");
pass("Identity membrane works");
pass("Kyber decrypt path works");
pass("Payload matches expected");

console.log("\n✅ E2E intake test passed\n");
