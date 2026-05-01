#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_SKILL_DIR="$(cd "$PROJECT_DIR/../osps/repos/seo-audit-skill/seo-audit" 2>/dev/null && pwd || true)"
SKILL_DIR="${SEO_AUDIT_SKILL_DIR:-$DEFAULT_SKILL_DIR}"

if [[ ! -d "$SKILL_DIR/scripts" ]]; then
  echo "SEO audit skill not found at: $SKILL_DIR" >&2
  exit 1
fi

npm run build
mkdir -p reports

python3 "$SKILL_DIR/scripts/check-schema.py" --file out/index.html | tee reports/local-check-schema.json
python3 "$SKILL_DIR/scripts/check-schema.py" --file out/guides/sticker-sheet-profit-calculator/index.html | tee reports/local-profit-guide-schema.json
python3 "$SKILL_DIR/scripts/check-schema.py" --file out/guides/cricut-print-then-cut-size-chart/index.html | tee reports/local-cricut-guide-schema.json

echo "Local static schema checks saved to reports/local-*.json"
