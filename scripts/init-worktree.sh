#!/bin/bash

# Worktree initialization script
# Usage: bash scripts/init-worktree.sh
# Copies .env from main branch and installs dependencies

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the main branch (usually main or master)
MAIN_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')

if [ -z "$MAIN_BRANCH" ]; then
  MAIN_BRANCH="main"
fi

echo -e "${YELLOW}Initializing worktree...${NC}"
echo -e "${YELLOW}Main branch detected: $MAIN_BRANCH${NC}"

# Check if we're in a worktree
if ! git rev-parse --git-dir | grep -q ".git/worktrees/"; then
  echo -e "${RED}Error: Not in a git worktree${NC}"
  exit 1
fi

# Copy .env from main branch if it doesn't exist
if [ ! -f ".env" ]; then
  echo -e "${YELLOW}Copying .env from $MAIN_BRANCH...${NC}"

  if git show "$MAIN_BRANCH:.env" > /dev/null 2>&1; then
    git show "$MAIN_BRANCH:.env" > .env
    echo -e "${GREEN}✓ .env copied from $MAIN_BRANCH${NC}"
  else
    echo -e "${RED}Error: .env not found in $MAIN_BRANCH${NC}"
    exit 1
  fi
else
  echo -e "${YELLOW}.env already exists, skipping${NC}"
fi

# Install dependencies with pnpm
if [ -f "pnpm-lock.yaml" ]; then
  echo -e "${YELLOW}Installing dependencies with pnpm...${NC}"
  pnpm install
  echo -e "${GREEN}✓ Dependencies installed${NC}"
elif [ -f "package.json" ]; then
  echo -e "${YELLOW}pnpm-lock.yaml not found, running pnpm install...${NC}"
  pnpm install
  echo -e "${GREEN}✓ Dependencies installed${NC}"
else
  echo -e "${RED}Error: package.json not found${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Worktree initialization complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. pnpm dev           # Start development server"
echo "  2. pnpm db:up         # Start Docker database (if needed)"
