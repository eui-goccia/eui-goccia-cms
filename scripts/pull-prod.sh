#!/usr/bin/env bash
set -euo pipefail

# Load .env if present
if [ -f .env ]; then
	set -a
	source .env
	set +a
fi

# Pull production database and media to local environment
# Prerequisites:
#   brew install tursodatabase/tap/turso
#   brew install minio/stable/mc
# Required env vars:
#   TURSO_DATABASE_URL — Turso database URL (libsql://...)
#   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET — R2 credentials

for var in TURSO_DATABASE_URL R2_ACCOUNT_ID R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY R2_BUCKET; do
	if [ -z "${!var:-}" ]; then
		echo "Error: $var is not set"
		exit 1
	fi
done

echo "==> Dumping production database..."
rm -f payload.sqlite
turso db shell "$TURSO_DATABASE_URL" .dump > dump.sql
cat dump.sql | sqlite3 payload.sqlite
rm dump.sql
echo "Database saved to payload.sqlite"

echo ""
echo "==> Syncing media from R2..."
bash scripts/sync-media.sh

echo ""
echo "==> Done. Run 'pnpm dev' to start."
