#!/usr/bin/env sh
set -eu

REPO_URL="${1:-}"

if [ -z "$REPO_URL" ]; then
  echo "Usage: npm run resume:setup -- <private-repo-git-url>"
  echo "Example: npm run resume:setup -- git@github.com:you/resume-data.git"
  exit 1
fi

if [ -d "resume-data/.git" ] || [ -f ".gitmodules" ] && grep -q 'resume-data' .gitmodules 2>/dev/null; then
  echo "resume-data submodule already configured."
  git submodule update --init --recursive
  exit 0
fi

if [ -e "resume-data" ]; then
  echo "resume-data already exists and is not a submodule. Remove or rename it first."
  exit 1
fi

git submodule add "$REPO_URL" resume-data
git submodule update --init --recursive

echo "Private resume submodule ready at resume-data/resume.json"
