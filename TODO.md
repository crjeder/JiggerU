# TODO

following good practice from https://github.com/todomd/todo.md

## In Progress

### hal-robot-integration

- [ ] Manual smoke test: configure robot URL in Settings, verify bar sync and type assignment flow #testing
- [ ] Manual smoke test: dispense a cocktail end-to-end (pre-mix → robot progress → post-mix) #testing
- [ ] Verify `barOnly` filter shows only cocktails the robot can make after sync #testing
- [ ] Verify app with no robot URL configured shows no robot UI anywhere #testing

### update-dependencies

- [ ] Test that a git commit triggers the pre-commit hook #testing
- [ ] Smoke-test the app in browser: browse cocktails, open detail page, visit My Bar and Settings #testing

## Backlog

- [x] Add unit tests for Redux selectors in `src/selectors/` #testing
- [x] Add unit tests for action creators in `src/actions.js` #testing
- [ ] Upgrade from React 16 to React 18 (functional components already in use) #refactor
- [ ] Upgrade Material UI from v4 to v5 #refactor
- [ ] Upgrade react-router-dom from v5 to v6 #refactor
- [ ] Add search by cocktail name functionality #feature
- [ ] Add "shuffle" / random cocktail button #feature
- [ ] Improve accessibility (ARIA labels, keyboard navigation) #a11y
- [ ] Add offline fallback page for PWA #pwa
- [ ] Add cocktail rating / personal notes feature #feature
- [ ] Expand non-IBA cocktail list beyond current extras #data
- [ ] Add ingredient substitution suggestions #feature
- [ ] Add print-friendly cocktail recipe view #feature

## Done ✓

- [x] Filter by ingredient, category, glass, vegan, makeable
- [x] Favourite cocktails
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
