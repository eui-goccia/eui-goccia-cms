#!/usr/bin/env bash
set -euo pipefail

# Load .env if present
if [ -f .env ]; then
	set -a
	source .env
	set +a
fi

# Pull production database and media to local environment.
# Safety contract:
#   - Reads from TURSO_DATABASE_URL.
#   - Writes only the local payload.sqlite file.
#   - Then calls scripts/sync-media.sh, which writes only to local MinIO.
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

echo "==> Read-only source: TURSO_DATABASE_URL"
echo "==> Local database destination: payload.sqlite"
echo "==> Dumping production database..."
rm -f payload.sqlite
turso db shell "$TURSO_DATABASE_URL" .dump > dump.sql
cat dump.sql | sqlite3 payload.sqlite
rm dump.sql
echo "Database saved to payload.sqlite"

echo ""
echo "==> Syncing media from R2 into local MinIO..."
bash scripts/sync-media.sh

echo ""
echo "==> Done. Use DATABASE_URL=file:payload.sqlite before running app/build locally."
