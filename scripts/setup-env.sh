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
  echo ".env symlink already exists -> $(readlink .env)"
  exit 0
fi

if [ -f ".env" ]; then
  echo ".env file already exists (not a symlink). Remove it first if you want to link."
  exit 1
fi

ln -s "$ENV_SOURCE" .env
echo "Linked .env -> $ENV_SOURCE"
