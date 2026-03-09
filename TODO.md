# TODO
following good practice from https://github.com/todomd/todo.md

## Backlog

- [ ] Add unit tests for Redux selectors in `src/selectors/` #testing
- [ ] Add unit tests for action creators in `src/actions.js` #testing
- [ ] Upgrade from React 16 to React 18 (functional components already in use) #refactor
- [ ] Upgrade Material UI from v4 to v5 #refactor
- [ ] Upgrade react-router-dom from v5 to v6 #refactor
- [ ] Add search by cocktail name functionality #feature
- [ ] Add "shuffle" / random cocktail button #feature
- [ ] Improve accessibility (ARIA labels, keyboard navigation) #a11y
- [ ] Add offline fallback page for PWA #pwa
- [ ] Add cocktail rating / personal notes feature #feature
- [ ] Expand non-IBA cocktail list beyond current extras #data
- [ ] Add ingredient substitution suggestions: curated map of brand names (e.g. "Gordon's Gin") to generic recipe ingredients (e.g. "Gin") so robot-synced bar items match makeable cocktails #feature
- [ ] Add vegan ingredient substitution suggestions (e.g. egg white → aquafaba) #feature #vegan
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
