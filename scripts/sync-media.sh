#!/usr/bin/env bash
set -euo pipefail

# Load .env if present
if [ -f .env ]; then
	set -a
	source .env
	set +a
fi

# Sync media files from Cloudflare R2 (production) to local MinIO
# Prerequisites: brew install minio/stable/mc
# Required env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET

for var in R2_ACCOUNT_ID R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY R2_BUCKET; do
	if [ -z "${!var:-}" ]; then
		echo "Error: $var is not set"
		exit 1
	fi
done

R2_ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
LOCAL_ALIAS="local"
R2_ALIAS="r2prod"

# Configure R2 remote
mc alias set "$R2_ALIAS" "$R2_ENDPOINT" "$R2_ACCESS_KEY_ID" "$R2_SECRET_ACCESS_KEY"

# Configure local MinIO (default docker-compose credentials)
mc alias set "$LOCAL_ALIAS" "http://localhost:9000" "${MINIO_ROOT_USER:-minio}" "${MINIO_ROOT_PASSWORD:-minio123}"

# Ensure local bucket exists
mc mb --ignore-existing "${LOCAL_ALIAS}/${S3_BUCKET:-payload}"

echo "Syncing images..."
mc mirror --overwrite "${R2_ALIAS}/${R2_BUCKET}/images/" "${LOCAL_ALIAS}/${S3_BUCKET:-payload}/images/"

echo "Syncing audio..."
mc mirror --overwrite "${R2_ALIAS}/${R2_BUCKET}/audio/" "${LOCAL_ALIAS}/${S3_BUCKET:-payload}/audio/"

echo "Media sync complete."
