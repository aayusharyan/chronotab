#!/usr/bin/env bash
# package-extension.sh - Build a minimal Chrome-extension ZIP for Web Store upload.
#
# Usage:  ./scripts/package-extension.sh [output-zip]
# Default output is chronotab.zip in the project root.

set -euo pipefail

OUT_ZIP="${1:-chronotab.zip}"
TMP_DIR="$(mktemp -d)"

# Ensure cleanup on exit
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

echo "• Preparing clean build directory: $TMP_DIR"

# 1. Copy mandatory extension assets
cp manifest.json "$TMP_DIR/"

# 2. Copy source files (HTML, CSS, JS, images)
#    — we use rsync to preserve structure and efficiently ignore unwanted artifacts
rsync -a --exclude "*.map" --exclude "*.DS_Store" src/ "$TMP_DIR/src/"

# 3. Optionally copy any top-level icons if you add them later (128.png, 48.png, etc.)
for icon in 16 32 48 128; do
  if [[ -f "${icon}.png" ]]; then
    cp "${icon}.png" "$TMP_DIR/"
  fi
done

# 4. Create the ZIP (-X strips extra file metadata for smaller size)
(cd "$TMP_DIR" && zip -r -X "../$OUT_ZIP" .)

echo "✅  Built $OUT_ZIP (ready for Chrome Web Store upload)"