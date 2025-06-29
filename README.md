# Starry Hill – Custom New Tab Extension

This repository contains a minimal Chrome-compatible extension that overrides the standard New Tab page with the animated "Starry Hill" scene found in `starry-hill/`.

## Loading the extension locally

1. Open Google Chrome (or any Chromium-based browser such as Edge or Brave).
2. Navigate to `chrome://extensions/` in the address bar.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked** and choose the project's root folder (the one that contains `manifest.json`).
5. Open a new tab – you should now see the Starry Hill animation.

## File structure

```
├── manifest.json        – Extension manifest (MV3)
├── starry-hill/
│   ├── index.html       – New Tab markup
│   └── index.css        – Animation styles
└── README.md            – This file
```

## Packaging for the Chrome Web Store (optional)

1. Bump the `version` field inside `manifest.json` every time you publish.
2. Zip the **contents** of the extension folder (not the folder itself).
3. Upload the ZIP in the Chrome Web Store Developer Dashboard and follow the publishing steps.

Enjoy your new starry night every time you open a tab! 