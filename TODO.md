# TODO

following good practice from https://github.com/todomd/todo.md

## In Progress

### curated-themes

- [x] Test each theme (classic, c64, speakeasy, blossom) in browser: set `activeTheme` in `public/index.html` and verify palette, font, and card width #testing
- [x] Test C64 theme on narrow viewport — cards should fill width without horizontal scroll #testing
- [x] Confirm Settings page no longer shows color picker or light/dark controls #testing
- [ ] Verify fonts load offline (install as PWA, go offline, confirm fonts render) #testing

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
- [ ] Cache thecocktaildb.com enrichment data (image URLs, IBA category, variants) in LocalStorage so cocktail details work offline #pwa #feature
- [x] Ambiguity resolution — when multiple bar items share the same type and recipe uses a generic ingredient name, determine which physical bottle the robot pours #robot
- [x] Per-cocktail brand override — allow configuring "treat Momentum Gin as generic Gin" for a specific cocktail #robot
