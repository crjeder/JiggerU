## Why

When a CocktailBot HAL robot is connected, the app is running in a kiosk/bar context where only makeable cocktails are relevant. Showing the full list with arbitrary filter controls creates confusion; the "Makeable from Bar" filter should be automatically enforced and locked.

## What Changes

- When `state.robot.connected` is `true`, the `barOnly` filter is automatically activated in `activeFilters`
- When `state.robot.connected` is `true`, the "Add Filter" button and filter menu are hidden
- When `state.robot.connected` is `true`, the `barOnly` filter chip is rendered without a delete/remove action (cannot be dismissed)
- When the robot disconnects, filter controls return to normal

## Capabilities

### New Capabilities

- `robot-enforced-filter`: When a robot is connected, the "Makeable from Bar" filter is automatically active and the filter controls are locked so the user cannot change or remove it.

### Modified Capabilities

<!-- None — existing robot-bar spec does not cover filter enforcement -->

## Impact

- `src/components/CocktailFilter.js` — hide Add Filter button and lock barOnly chip when robot connected
- `src/components/Filters/FilterChips.js` — suppress delete action on barOnly chip when robot connected
- `src/selectors/index.js` or `src/reducers/index.js` — may need selector for effective active filters (robot enforces barOnly)
- `src/filterConfig.js` — read-only, no changes needed
