-- Encrypted intake requests (ciphertext-only storage)
CREATE TABLE IF NOT EXISTS intake_requests (
  id TEXT PRIMARY KEY,
  v TEXT NOT NULL,
  encrypted_json TEXT NOT NULL,
  received_at TEXT NOT NULL,
  ip_hash TEXT,
  ua TEXT,
  ref TEXT
);

-- Index for time-ordered queries
CREATE INDEX IF NOT EXISTS idx_intake_received_at ON intake_requests(received_at DESC);
