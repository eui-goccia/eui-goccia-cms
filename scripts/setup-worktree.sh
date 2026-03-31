#!/usr/bin/env bash
set -euo pipefail

# setup-worktree.sh
# Copies .env from the main worktree and installs dependencies.
# Run this from inside a git worktree directory.

# ── Resolve the main worktree (source of truth for .env) ───────────────
MAIN_WORKTREE=$(git worktree list --porcelain | head -1 | sed 's/^worktree //')

if [[ -z "$MAIN_WORKTREE" ]]; then
  echo "❌ Could not determine the main worktree."
  exit 1
fi

CURRENT_DIR=$(pwd)

if [[ "$CURRENT_DIR" == "$MAIN_WORKTREE" ]]; then
  echo "⚠️  You're in the main worktree. This script is meant for secondary worktrees."
  echo "   Run it from inside a worktree you created with 'git worktree add'."
  exit 1
fi

echo "📂 Main worktree:    $MAIN_WORKTREE"
echo "📂 Current worktree: $CURRENT_DIR"
echo ""

# ── Copy .env files ────────────────────────────────────────────────────
COPIED=0

for envfile in .env .env.local; do
  SRC="$MAIN_WORKTREE/$envfile"
  DEST="$CURRENT_DIR/$envfile"

  if [[ -f "$SRC" ]]; then
    cp "$SRC" "$DEST"
    echo "✅ Copied $envfile"
    COPIED=$((COPIED + 1))
  fi
done

if [[ $COPIED -eq 0 ]]; then
  echo "⚠️  No .env files found in main worktree."
fi

echo ""

# ── Install dependencies ──────────────────────────────────────────────
echo "📦 Installing dependencies with pnpm..."
pnpm install

echo ""
echo "🎉 Worktree is ready! You can now run: pnpm dev"
