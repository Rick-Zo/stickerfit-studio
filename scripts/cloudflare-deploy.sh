#!/usr/bin/env bash
set -euo pipefail

scripts/load-env-run.sh npm run build
scripts/load-env-run.sh wrangler pages deploy out --project-name stickerfit-studio
