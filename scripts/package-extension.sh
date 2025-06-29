#!/usr/bin/env bash
# package-extension.sh - Build a minimal Chrome-extension ZIP for Web Store upload.
#
# Usage:  ./scripts/package-extension.sh [output-zip]
# Default output is tokitab.zip in the project root.

set -euo pipefail

OUT_ZIP="${1:-tokitab.zip}"
TMP_DIR="$(mktemp -d)"

echo "[DEBUG] OUT_ZIP: $OUT_ZIP"
echo "[DEBUG] TMP_DIR: $TMP_DIR"

# Ensure cleanup on exit
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

echo "• Preparing clean build directory: $TMP_DIR"

# 1. Copy mandatory extension assets
echo "[DEBUG] Copying manifest.json to $TMP_DIR/"
cp manifest.json "$TMP_DIR/"

# 2. Copy source files (HTML, CSS, JS, images)
echo "[DEBUG] Copying src/ to $TMP_DIR/src/"
rsync -a --exclude "*.map" --exclude "*.DS_Store" src/ "$TMP_DIR/src/"

# 3. Optionally copy any top-level icons if you add them later (128.png, 48.png, etc.)
for icon in 16 32 48 128; do
  if [[ -f "${icon}.png" ]]; then
    echo "[DEBUG] Copying icon ${icon}.png to $TMP_DIR/"
    cp "${icon}.png" "$TMP_DIR/"
  fi
done

echo "[DEBUG] Listing contents of $TMP_DIR before zipping:"
ls -lh "$TMP_DIR"
ls -lh "$TMP_DIR/src" || true

# 4. Create the ZIP (-X strips extra file metadata for smaller size)
echo "[DEBUG] Creating ZIP in project root: ../$OUT_ZIP from $TMP_DIR"
(cd "$TMP_DIR" && zip -r -X "../$OUT_ZIP" .)

# Check if ZIP was created
if [[ -f "$OUT_ZIP" ]]; then
  echo "✅  Built $OUT_ZIP (ready for Chrome Web Store upload)"
else
  echo "[ERROR] ZIP file $OUT_ZIP was not created!"
  exit 1
fi