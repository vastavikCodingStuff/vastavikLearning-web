#!/usr/bin/env bash
# verify-security.sh — security audit.
#   1. npm audit (high+ only)
#   2. Headers check (manual — see .agents/ROLES.md §3)
#   3. Quick code scan for forbidden patterns
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> npm audit (high+)"
HIGH=$(npm audit --audit-level=high --json 2>/dev/null | python -c "import json,sys; d=json.load(sys.stdin); m=d.get('metadata',{}).get('vulnerabilities',{}); print(m.get('high',0)+m.get('critical',0))" || echo 0)
if [ "$HIGH" -gt 0 ]; then
  echo "❌ $HIGH high/critical vulnerabilities. Run: npm audit fix"
  exit 1
fi
echo "   0 high/critical vulnerabilities."

echo "==> Forbidden patterns scan"
FORBIDDEN=$(grep -rE --include='*.ts' --include='*.tsx' \
  -e 'dangerouslySetInnerHTML' \
  -e 'eval\(' \
  -e 'new Function\(' \
  -e 'sk-[A-Za-z0-9]{20,}' \
  -e 'AIza[0-9A-Za-z_-]{35}' \
  -e 'AKIA[0-9A-Z]{16}' \
  src/ 2>/dev/null || true)
if [ -n "$FORBIDDEN" ]; then
  echo "❌ Forbidden patterns found:"
  echo "$FORBIDDEN"
  exit 1
fi
echo "   none found."

echo "==> Headers check (next.config.mjs)"
if ! grep -q 'headers()' next.config.mjs; then
  echo "❌ next.config.mjs is missing security headers()"
  exit 1
fi
echo "   headers() present."

echo "✅ verify-security: OK"
