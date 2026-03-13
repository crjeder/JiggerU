# TODO

following good practice from https://github.com/todomd/todo.md

## In Progress

### curated-themes

- [x] Test each theme (classic, c64, speakeasy, blossom) in browser: set `activeTheme` in `public/index.html` and verify palette, font, and card width #testing
- [x] Test C64 theme on narrow viewport — cards should fill width without horizontal scroll #testing
- [x] Confirm Settings page no longer shows color picker or light/dark controls #testing
- [ ] Verify fonts load offline (install as PWA, go offline, confirm fonts render) #testing

### upgrade-mui-v4-to-v5

- [ ] Run `npm test -- -u` to regenerate snapshots with MUI v5 class names #testing
- [ ] Visual verify in browser: cocktail list, cocktail detail, settings, my bar, filter panel #testing
- [ ] Check browser console for MUI deprecation warnings #testing

### hal-robot-integration

- [x] Manual smoke test: configure robot URL in Settings, verify bar sync and type assignment flow UI #testing
- [ ] Manual smoke test: dispense a cocktail end-to-end (pre-mix → robot progress → post-mix) — requires live robot hardware #testing
- [x] Verify `barOnly` filter shows only cocktails the robot can make after sync — enforced automatically via `effectiveActiveFiltersSelector` #testing
- [x] Verify app with no robot URL configured shows no robot UI anywhere #testing

## Backlog

- [ ] Migrate from CRA (`react-scripts`) to Vite — fixes Node 24 deprecation warnings from CRA's bundled tooling #refactor
- [ ] Add "shuffle" / random cocktail button #feature
- [ ] Improve accessibility (ARIA labels, keyboard navigation) #a11y
- [ ] Add offline fallback page for PWA #pwa
- [ ] Ambiguity resolution — when multiple bar items share the same type and recipe uses a generic ingredient name, determine which physical bottle the robot pours #robot
- [ ] Per-cocktail brand override — allow configuring "treat Momentum Gin as generic Gin" for a specific cocktail #robot
