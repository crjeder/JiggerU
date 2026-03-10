## 1. Selector

- [x] 1.1 Add `effectiveActiveFiltersSelector` to `src/selectors/index.js` that returns `activeFilters` with `barOnly` injected when `state.robot.connected` is true
- [x] 1.2 Add selector unit tests in `src/selectors/selectors.spec.js` covering: robot connected without barOnly, robot connected with barOnly already present, robot disconnected

## 2. Filter Chip Locking

- [x] 2.1 Pass `state.robot.connected` into `FilterChips` via `mapStateToProps`
- [x] 2.2 Suppress the `onDelete` prop on the `barOnly` chip when robot is connected (renders chip without delete icon)
- [x] 2.3 Update `FilterChips` snapshot test

## 3. Add Filter Button

- [x] 3.1 Pass `state.robot.connected` into `CocktailFilter` via `mapStateToProps`
- [x] 3.2 Conditionally hide the "Add Filter" `<Button>` and `<Menu>` when robot is connected
- [x] 3.3 Update `CocktailFilter` snapshot test

## 4. Wire Selector

- [x] 4.1 Replace `state.filterOptions.activeFilters` with `effectiveActiveFiltersSelector` in `filteredCocktailsSelector` (or wherever active filters are consumed to build the filter pipeline)
- [x] 4.2 Verify cocktail list filters to makeable-only when robot is connected in the browser

## 5. Tests & Cleanup

- [x] 5.1 Run full test suite (`npm test`) and update snapshots (`npm test -- -u`) as needed
- [x] 5.2 Verify no regressions in filter behaviour when robot is disconnected
