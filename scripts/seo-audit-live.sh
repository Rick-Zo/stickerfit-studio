#!/usr/bin/env bash
set -euo pipefail

URL="${1:-}"
KEYWORD="${2:-sticker sheet calculator}"
SKILL_DIR="${SEO_AUDIT_SKILL_DIR:-/Users/rick/Documents/AICode/osps/repos/seo-audit-skill/seo-audit}"

if [[ -z "$URL" ]]; then
  echo "Usage: scripts/seo-audit-live.sh https://your-domain.com/ \"sticker sheet calculator\"" >&2
  exit 1
fi

if [[ ! -d "$SKILL_DIR/scripts" ]]; then
  echo "SEO audit skill not found at: $SKILL_DIR" >&2
  exit 1
fi

mkdir -p reports

python3 "$SKILL_DIR/scripts/check-site.py" "$URL" | tee reports/live-check-site.json
python3 "$SKILL_DIR/scripts/check-page.py" "$URL" --keyword "$KEYWORD" | tee reports/live-check-page.json
python3 "$SKILL_DIR/scripts/check-schema.py" "$URL" | tee reports/live-check-schema.json

echo "Saved JSON outputs to reports/live-check-*.json"
