## Context

The app currently builds its MUI theme at runtime from two Redux settings values (`color`, `theme`), allowing users to pick any of 6 accent colors and toggle light/dark. This produces 12 possible combos but no coherent visual identity — fonts, border-radius, card density, and shadows never change. The new model replaces this with a registry of 4 hand-crafted theme objects, each a complete visual personality, selected by an admin at deploy time.

The app is a static React PWA (no backend). Deployment is Netlify. All persistence is localStorage.

## Goals / Non-Goals

**Goals:**

- Four named themes (`classic`, `c64`, `negroni`, `blossom`), each defining palette, typography, shape, card density
- Admin switches theme by editing one value in `public/index.html` — no rebuild required
- All fonts served locally (woff2) — no CDN, works offline as PWA
- Card layout density (width, columns) is a property of the theme, not a separate setting

**Non-Goals:**

- User-selectable themes (admin-only decision)
- Runtime theme switching without page reload
- Adding new themes without a code rebuild
- Theming beyond MUI's scope (e.g., custom CSS animations per theme)

## Decisions

### 1. Admin config via `window.__APP_CONFIG__` in `index.html`

**Decision:** Inline a small config object as a `<script>` block in `public/index.html`:

```html
<script>
  window.__APP_CONFIG__ = { activeTheme: "c64" };
</script>
```

**Why over `public/config.json` + fetch:** A JSON fetch is async, requiring a loading state or flash-of-wrong-theme. The inline script is synchronous — the value is available before React initialises. Admin workflow is identical: edit one line, push, auto-deploy.

**Why over env vars:** `REACT_APP_*` env vars are baked in at build time. This approach lets an admin swap themes on a running deployment by editing a file on their hosting without triggering a rebuild.

---

### 2. Theme registry: named objects in `src/themes/`

**Decision:**

```
src/themes/
  index.js          ← maps name → MUI theme object
  classic/theme.js
  c64/theme.js
  negroni/theme.js
  blossom/theme.js
```

`src/theme.js` reads `window.__APP_CONFIG__.activeTheme`, looks it up in the registry, and passes it to `MuiThemeProvider`. Falls back to `classic` if the name is unrecognised.

**Why not a single file:** Keeps each theme isolated. Adding or removing a theme means adding/removing one file + one registry entry. No side-effects.

---

### 3. Card width as `theme.custom.cardWidth`

**Decision:** Each theme defines a `custom.cardWidth` (pixels) in its MUI theme object. `CocktailCard` reads `theme.custom.cardWidth` instead of the current hardcoded `theme.spacing(40)`.

**Why:** Density is a property of the visual identity. C64 uses 640px (one card per row on most viewports, simulating low-resolution). Blossom uses 260px (many slim cards). This requires zero new props or Redux state — the theme IS the layout config.

---

### 4. Fonts in `public/fonts/`, declared in `public/index.html`

**Decision:** woff2 files in `public/fonts/`. `@font-face` rules declared in `<style>` in `index.html`. Theme objects reference the family name string.

**Why not CSS-in-JS font injection:** MUI's theme doesn't inject `@font-face` rules. Declaring them in `index.html` ensures they're available before any component renders, preventing FOUT.

**Why woff2 only:** Browser support is universal for the target audience. Single format keeps font directory lean.

---

### 5. Remove `color` and `theme` from Redux

**Decision:** Delete `color: "indigo"` and `theme: "light"` from `settings` default state. Remove corresponding UI in `Settings.js`.

**Why not keep as override:** These values are now meaningless. Keeping dead state is confusing and the Settings UI removal is a user-facing improvement (less noise).

---

## Theme Specifications

| Theme   | Palette                         | Font             | borderRadius | cardWidth | Density | Mode  |
| ------- | ------------------------------- | ---------------- | ------------ | --------- | ------- | ----- |
| classic | indigo primary / teal secondary | Roboto (system)  | 4px          | 320px     | normal  | light |
| c64     | cobalt blue / pale blue-white   | Press Start 2P   | 0px          | 640px     | compact | dark  |
| negroni | amber / cream                   | Playfair Display | 4px          | 280px     | airy    | dark  |
| blossom | sakura pink / sage green        | Quicksand        | 20px         | 260px     | airy    | light |

Density maps to MUI's `spacing` multiplier:

- `compact`: `spacing(0.5)` base → tight padding in cards and lists
- `normal`: `spacing(1)` → current default
- `airy`: `spacing(1.5)` → generous whitespace

---

## Risks / Trade-offs

- **Font file size** → Mitigation: woff2 is compressed. Press Start 2P is ~30KB, Quicksand variable ~100KB, Playfair Display ~90KB. All served as static assets, cached by service worker.
- **`window.__APP_CONFIG__` is mutable JS** → Mitigation: This is admin config, not security-sensitive. Document that it's the intended edit point.
- **C64 640px cards on small screens** → Mitigation: Use `max-width: 100%` so cards don't overflow on mobile — they just fill the screen, which is the intended C64 feel.
- **Snapshot tests will fail** after Settings and CocktailCard changes → Mitigation: Update snapshots intentionally as part of implementation tasks.

## Migration Plan

1. Implement theme registry and new `theme.js` loader
2. Add fonts to `public/fonts/` and `@font-face` to `index.html`
3. Add `window.__APP_CONFIG__` to `index.html` (default: `"classic"`)
4. Update `CocktailCard` to use `theme.custom.cardWidth`
5. Remove `color`/`theme` from Redux and Settings UI
6. Run `npm test -- -u` to update snapshots
7. Verify all 4 themes manually in browser

Rollback: revert `index.html` `activeTheme` to `"classic"` — immediate, no rebuild.
