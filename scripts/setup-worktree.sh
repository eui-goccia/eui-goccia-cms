#!/usr/bin/env bash
set -euo pipefail

# Resolve the main worktree (original repo root)
MAIN_WORKTREE=$(git worktree list --porcelain | head -1 | sed 's/worktree //')
ENV_SOURCE="$MAIN_WORKTREE/.env"

if [ ! -f "$ENV_SOURCE" ]; then
  echo "Error: No .env found in main worktree ($MAIN_WORKTREE)"
  exit 1
fi

if [ -L ".env" ]; then
  CURRENT_TARGET="$(readlink .env)"
  if [ "$CURRENT_TARGET" = "$ENV_SOURCE" ]; then
    echo ".env symlink already exists -> $CURRENT_TARGET"
  else
    echo "Error: .env symlink points to '$CURRENT_TARGET', expected '$ENV_SOURCE'"
    exit 1
  fi
elif [ -e ".env" ]; then
  echo ".env already exists ($(file -b .env)). Remove it first if you want to link."
  exit 1
else
  ln -s "$ENV_SOURCE" .env
  echo "Linked .env -> $ENV_SOURCE"
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install
