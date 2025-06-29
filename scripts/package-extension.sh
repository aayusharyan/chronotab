#!/usr/bin/env bash
# package-extension.sh - Build a minimal Chrome-extension ZIP for Web Store upload.
#
# Usage:  ./scripts/package-extension.sh [output-zip]
# Default output is tokitab.zip in the project root.

set -euo pipefail

# Get the directory where this script resides (project root)
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_ZIP="${1:-tokitab.zip}"
OUT_PATH="$SCRIPT_DIR/$OUT_ZIP"
TMP_DIR="$(mktemp -d)"

# Ensure cleanup on exit
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

echo "• Preparing clean build directory: $TMP_DIR"

# 1. Copy mandatory extension assets
cp "$SCRIPT_DIR/manifest.json" "$TMP_DIR/"

# 2. Copy source files (HTML, CSS, JS, images)
rsync -a --exclude "*.map" --exclude "*.DS_Store" "$SCRIPT_DIR/src/" "$TMP_DIR/src/"

# 3. Optionally copy any top-level icons if you add them later (128.png, 48.png, etc.)
for icon in 16 32 48 128; do
  if [[ -f "$SCRIPT_DIR/${icon}.png" ]]; then
    cp "$SCRIPT_DIR/${icon}.png" "$TMP_DIR/"
  fi
done

# 4. Create the ZIP (-X strips extra file metadata for smaller size)
(cd "$TMP_DIR" && zip -r -X "$OUT_PATH" .)

# Check if ZIP was created
if [[ -f "$OUT_PATH" ]]; then
  echo "✅  Built $OUT_ZIP in project root (ready for Chrome Web Store upload)"
else
  echo "[ERROR] ZIP file $OUT_ZIP was not created in project root!"
  exit 1
fi