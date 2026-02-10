#!/usr/bin/env node
/**
 * Initialize D1 schema in all local sqlite databases
 *
 * This handles the quirk where wrangler pages dev and wrangler d1 execute
 * may create different sqlite files. We init the schema in ALL of them.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS intake_requests (
  id TEXT PRIMARY KEY,
  v TEXT NOT NULL,
  encrypted_json TEXT NOT NULL,
  received_at TEXT NOT NULL,
  ip_hash TEXT,
  ua TEXT,
  ref TEXT
);
CREATE INDEX IF NOT EXISTS idx_intake_received_at ON intake_requests(received_at DESC);
`;

const d1Dir = path.join(PROJECT_ROOT, ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");

// First, run wrangler d1 execute to create the standard database
console.log("Initializing D1 via wrangler...");
try {
  execSync("npx wrangler d1 execute marketing-pilot-intake --local --file=./schema.sql", {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });
} catch (err) {
  console.error("Warning: wrangler d1 execute failed (may be first run)");
}

// Now also init schema in any existing sqlite files
if (fs.existsSync(d1Dir)) {
  console.log("\nInitializing schema in all local D1 sqlite files...");

  const sqliteFiles = fs.readdirSync(d1Dir).filter(
    (f) => f.endsWith(".sqlite") && !f.includes("-shm") && !f.includes("-wal")
  );

  for (const file of sqliteFiles) {
    const dbPath = path.join(d1Dir, file);
    try {
      execSync(`sqlite3 "${dbPath}" "${SCHEMA.replace(/\n/g, " ")}"`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });
      console.log(`  ✓ ${file}`);
    } catch (err) {
      console.log(`  ⚠ ${file} (may already be initialized)`);
    }
  }
}

console.log("\n✓ D1 schema initialization complete");
