#!/usr/bin/env bash
# verify-build.sh — run lint, type-check, build. Exits non-zero on any failure.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "==> npm run lint"
npm run lint
echo "==> npm run build"
npm run build
echo "✅ verify-build: OK"
