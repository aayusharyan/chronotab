# LLM_RULES.md

## 1. High-Level Architecture

1. **Browser Extension (Manifest v3)**
   The project is packaged as a Chrome/Chromium extension. `manifest.json` declares `manifest_version: 3` and overrides the browser's new-tab page with `src/index.html`.
2. **Entry Point (`src/index.html`)**
   A minimal HTML shell that mounts the JavaScript bundle (no build-step needed).
3. **Presentation Layer (VanJS)**
   The UI is written with [VanJS](https://vanjs.org) – a zero-dependency, functional UI micro-framework.
   • `src/components/app.js` is the SPA root.
   • Individual clock faces live in `src/components/*.js` and are registered in `variants` inside `app.js`.
4. **Assets**
   • `src/assets/css/` – one stylesheet per clock face.
   • `src/assets/js/` – helper scripts or animation logic that a component may depend on.
   These files are **dynamically injected** by `app.js` when a user picks a clock.
5. **No Build Step**
   Everything ships as plain ES Modules; the browser loads them directly.

## 2. Uniformity Requirements

Consistency makes it easier for humans **and** LLMs to reason about the codebase. When you add or modify code, **follow the existing patterns**:

• File naming is kebab-case for assets (`ambient-neon-rings.css`) and PascalCase for components (`AmbientNeonRings.js`).
• Every component should `export default` a function that returns VanJS nodes.
• Keep imports ordered: external libs, shared utils, local relative files.
• Prefer ES Modules and modern JavaScript (no `var`, avoid legacy patterns).
• Run `prettier` (config already present) before committing.

## 3. Documentation Guidelines (OSS-Style)

We aim for friendly, beginner-oriented docs without superfluous noise:

1. **File header** – add a 3-5 line JSDoc-style block **at the top of every source file** explaining what the file does. Write as if you are mentoring a junior engineer. Example:

```js
/**
 * 🎯 Purpose: Render the Retro Flipboard clock face using CSS animations.
 * 📦 Exports: default function `RetroFlipboard()` (VanJS component).
 * 💡 Key idea: Update the DOM only once per second to minimise repaints.
 */
```

2. **Inline comments** – explain _why_ non-trivial code exists (algorithm choices, edge cases).
   Do **not** comment obvious syntax (e.g. "this is a loop" or "this is an if").

3. **Style constraints** – avoid ASCII rulers like `----------` or `==========`. They are visually noisy and the maintainer dislikes them.

4. **README vs Docs** – keep the main `README.md` user-focused. Put deep technical notes either in the file headers or separate developer docs.

## 4. Explaining Complex Code

When you encounter intricate logic (e.g. time-zone calculations, animation frames), accompany it with concise, high-signal comments that describe:

• The problem being solved.
• The chosen approach and its trade-offs.
• Any references or formulae used.

## 5. Adding New Clock Faces (Example Workflow)

1. **Create assets**:
   • `src/assets/css/my-clock.css`
   • `src/assets/js/my-clock.js` (optional)
2. **Create component**: `src/components/MyClock.js` exporting a VanJS function.
3. **Register** the variant inside the `variants` object in `app.js`.
4. **Document** both new files with headers and meaningful inline comments.
5. **Test** by reloading the extension in _Developer Mode_.

## 6. Pull Request Checklist

- [ ] Code passes `npm test` (if tests exist) and linter.
- [ ] Headers present in every modified/created file.
- [ ] No ASCII rulers (`---`, `===`) added.
- [ ] Documentation written for junior-level clarity.
- [ ] Commit messages follow Conventional Commits (e.g. `feat: add Solar Eclipse clock face`).

---

**Happy hacking!** Let's keep TokiTab accessible, educational, and fun.
