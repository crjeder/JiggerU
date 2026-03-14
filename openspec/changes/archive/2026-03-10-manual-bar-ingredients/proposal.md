## Why

The robot bar sync only populates `state.bar` with ingredients the robot can physically dispense (pump slots). Ingredients like Basil, Mint, or Egg White — which a human prepares manually — are never registered, causing the "Makeable from Bar" filter and gauge to incorrectly exclude cocktails that the robot-assisted setup can actually make.

## What Changes

- Add an optional `public/manual-ingredients.json` config file listing non-robot ingredients available at the bar (garnishes, herbs, etc.)
- Add a `useManualIngredients` hook that fetches this file at startup and dispatches its contents to a new `state.manualBar` Redux slice
- Update `barSelector` to return the union of `state.bar` (robot-dispensable) and `state.manualBar` (manually available), so all downstream filter logic sees the full picture without modification

## Capabilities

### New Capabilities

- `manual-bar-ingredients`: Static runtime config of non-robot bar ingredients; loaded at startup, merged into the bar selector for filter/makeable computations

### Modified Capabilities

- `robot-bar`: The bar selector now returns a union of robot and manual ingredients rather than robot-only entries

## Impact

- **New file**: `public/manual-ingredients.json` (optional; 404 = silently ignored)
- **New hook**: `src/hooks/useManualIngredients.js`
- **New action/reducer**: `MANUAL_INGREDIENTS_LOADED` → `state.manualBar`
- **Updated selector**: `barSelector` in `src/selectors/index.js`
- **No changes**: `DispenseWorkflow`, `filterConfig.js`, `filterRules.js`, `useRobotBar.js`
