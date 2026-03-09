## 1. Fonts and Public Assets

- [x] 1.1 Create `public/fonts/` directory and download `PressStart2P-Regular.woff2` (C64)
- [x] 1.2 Download `PlayfairDisplay-Regular.woff2` and `PlayfairDisplay-Italic.woff2` (Negroni)
- [x] 1.3 Download `Quicksand-Regular.woff2` and `Quicksand-Medium.woff2` (Blossom)
- [x] 1.4 Add `@font-face` declarations and `window.__APP_CONFIG__ = { activeTheme: "classic" }` to `public/index.html`

## 2. Theme Registry

- [x] 2.1 Create `src/themes/classic/theme.js` — indigo/teal, Roboto, 4px radius, cardWidth 320, normal density
- [x] 2.2 Create `src/themes/c64/theme.js` — cobalt/pale-blue, Press Start 2P, 0px radius, cardWidth 640, compact density, dark mode
- [x] 2.3 Create `src/themes/negroni/theme.js` — amber/cream, Playfair Display, 4px radius, cardWidth 280, airy density, dark mode
- [x] 2.4 Create `src/themes/blossom/theme.js` — sakura pink/sage, Quicksand, 20px radius, cardWidth 260, airy density, light mode
- [x] 2.5 Create `src/themes/index.js` — registry mapping name → theme object, with `classic` fallback

## 3. Theme Loader

- [x] 3.1 Refactor `src/theme.js` — remove Redux `connect`, read `window.__APP_CONFIG__.activeTheme`, look up theme from registry, fall back to `classic`

## 4. Card Layout

- [x] 4.1 Update `CocktailCard.js` — replace `theme.spacing(40)` with `theme.custom.cardWidth`
- [x] 4.2 Ensure card `max-width: 100%` is set so wide cards (C64) don't overflow on small viewports

## 5. Remove Legacy Theme Settings

- [x] 5.1 Remove `color` and `theme` keys from settings default state in `src/reducers/index.js`
- [x] 5.2 Remove color picker and light/dark toggle UI from `src/components/Settings.js`
- [x] 5.3 Remove the `colors` export and `createTheme(color, theme)` function from `src/theme.js`

## 6. Tests and Snapshots

- [x] 6.1 Run `npm test` — expect snapshot failures in Settings and CocktailCard
- [x] 6.2 Run `npm test -- -u` to update snapshots intentionally
- [x] 6.3 Verify all tests pass

## 7. Manual Verification

- [ ] 7.1 Test each theme by temporarily changing `activeTheme` in `index.html` and confirming palette, font, and card width render correctly
- [ ] 7.2 Test C64 theme on a narrow viewport — cards should fill width without horizontal scroll
- [ ] 7.3 Confirm Settings page no longer shows color or light/dark controls
- [ ] 7.4 Confirm PWA offline load works with locally served fonts
