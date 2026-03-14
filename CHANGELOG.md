# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Label-first ingredient matching in dispense resolution: when a recipe ingredient has a `label` (brand hint), the robot prefers the matching bar slot over a generic type match, falling back silently if the brand isn't available
- "Mix it!" button at the bottom of each cocktail card, opening the dispense workflow directly from the browse view; button text is theme-configurable (`theme.custom.mixButtonLabel`), e.g. c64 shows "RUN"
- Robot-enforced bar-only filter: when a CocktailBot HAL robot is connected, the "Makeable from Bar" filter is automatically active and filter controls are locked (Add Filter button hidden, barOnly chip not dismissible)
- CHANGELOG.md following Keep a Changelog format
- TODO.md following todo.md best practices
- CLAUDE.md project guide for AI-assisted development
- Unit tests for all Redux action creators in `src/actions.spec.js` (23 tests)
- Unit tests for all Redux selectors in `src/selectors/selectors.spec.js` (18 tests)
- Gin Basil Smash recipe (with Momentum Holy Basil Gin) to cocktail data
- Basil to ingredient list

### Removed

- Favourites feature: Redux state, action type, action creator, reducer, selectors, and localStorage persistence — the feature was never surfaced in any filter or view
- `CocktailActions` component (contained the heart toggle and "Learn More" button)
- "Learn More" button from cocktail cards and table view — duplicated card-click navigation
- "Actions" column from table view
- `favouritesOnly` filter option

### Changed

- README updated to reflect current scope, features, and contributing guidelines

## [0.1.0] - 2023-03-14

### Added

- QR code on each cocktail detail page for easy sharing

## [0.0.9] - 2021-09-06

### Security

- Bumped `immer` from 8.0.1 to 9.0.6 (security patch)
- Bumped `immer` from 7.0.9 to 8.0.1 (security patch)

## [0.0.8] - 2020-09-27

### Added

- Table view for cocktail list (alternate layout option)
- Persisted settings across browser sessions

### Changed

- Button labels hidden on mobile viewports to save space
- Cocktail image fetch made conditional to reduce unnecessary network requests
- TheCocktailDB enrichment logic extracted into dedicated `useEnrichCocktail` hook

### Fixed

- Dependencies updated to resolve compatibility issues

## [0.0.7] - 2020-06-21

### Fixed

- Aviation cocktail recipe corrected
- Bug fix for filter/display issues (#119)

### Changed

- Dependencies updated

## [0.0.6] - 2020-02-09

### Changed

- Deployment hostname updated in README

## [0.0.5] - 2019-07-05

### Added

- Godmother and Godfather cocktail recipes

## [0.0.4] - 2019-07-03

### Added

- Action type constants consolidated into a single file (`src/actionTypes.js`)
- Code formatting enforced via Prettier pre-commit hook (husky)

### Changed

- Refactored reducers to use `immer` for immutable state updates
- Async/await adopted for data fetching
- TheCocktailDB enrichment hook introduced

## [0.0.3] - 2019-06-30

### Added

- Filter cocktails by ingredient, category, glass type, vegan, or "makeable from your bar"
- "My Bar" ingredient inventory (localStorage-backed)
- Favourite cocktails feature
- Configurable colour schemes
- Measurement unit selector (parts / ml / cl / oz)
- Pro bartender mode (replaces measurements with "Jigger", "Pony", etc.)
- TheCocktailDB integration for cocktail images and enrichment
- PWA support — installable on mobile via "Add to Home Screen"
- Redux store with `redux-thunk` middleware and `reselect` memoised selectors

[Unreleased]: https://github.com/crjeder/JiggerU/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/crjeder/JiggerU/compare/v0.0.9...v0.1.0
[0.0.9]: https://github.com/crjeder/JiggerU/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/crjeder/JiggerU/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/crjeder/JiggerU/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/crjeder/JiggerU/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/crjeder/JiggerU/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/crjeder/JiggerU/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/crjeder/JiggerU/releases/tag/v0.0.3
