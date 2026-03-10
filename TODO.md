# TODO

following good practice from https://github.com/todomd/todo.md

## In Progress

### curated-themes

- [x] Test each theme (classic, c64, negroni, blossom) in browser: set `activeTheme` in `public/index.html` and verify palette, font, and card width #testing
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
- [ ] Verify `barOnly` filter shows only cocktails the robot can make after sync — can be automated via mocked robot API responses #testing
- [x] Verify app with no robot URL configured shows no robot UI anywhere #testing

### update-dependencies

- [x] Test that a git commit triggers the pre-commit hook #testing
- [x] Smoke-test the app in browser: browse cocktails, open detail page, visit My Bar and Settings #testing

## Backlog

- [x] Add unit tests for Redux selectors in `src/selectors/` #testing
- [x] Add unit tests for action creators in `src/actions.js` #testing
- [x] Upgrade from React 16 to React 18 (functional components already in use) #refactor
- [x] Upgrade Material UI from v4 to v5 #refactor
- [x] Upgrade react-router-dom from v5 to v6 #refactor
- [x] Add search by cocktail name functionality #feature
- [ ] Add "shuffle" / random cocktail button #feature
- [ ] Improve accessibility (ARIA labels, keyboard navigation) #a11y
- [ ] Add offline fallback page for PWA #pwa
- [x] Expand non-IBA cocktail list beyond current extras #data
- [ ] Ambiguity resolution — when multiple bar items share the same type and recipe uses a generic ingredient name, determine which physical bottle the robot pours #robot
- [ ] Per-cocktail brand override — allow configuring "treat Momentum Gin as generic Gin" for a specific cocktail #robot
- [x] Remove "Favourite" logic. It is not used.
- [x] Remove "Learn more" button. It does the same thing as a click on the card
- [ ] Add a "mix it!" button at the bottom of the card. Extra points if the text is configured by the theme (e. g. c64: "run")
- [ ] Rename "Negroni" Theme to

## Done ✓

- [x] Filter by ingredient, category, glass, vegan, makeable
- [x] Favourite cocktails (removed — feature was never surfaced)
- [x] Integration with TheCocktailDB for images
- [x] Configurable color schemes
- [x] Measurement units (parts / ml / cl / oz)
- [x] Pro bartender mode (jigger/pony lingo)
- [x] PWA support / installable on smart devices
- [x] Table view for cocktail list
- [x] Robot bar integration (CocktailBotHAL)
- [x] Hide button labels on mobile viewports
- [x] Persisted settings across sessions
- [x] Create TODO.md following todo.md best practices #docs
- [x] Add CHANGELOG.md following Keep a Changelog format #docs
- [x] Create claude-progress.txt to track session progress #docs
