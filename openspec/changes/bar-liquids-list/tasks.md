## 1. Dev Script

- [x] 1.1 Update `scripts/dev-robot.js` to pass `--liquids examples/mock-server/liquids.json` to the mock server cargo invocation

## 2. New Component

- [x] 2.1 Create `src/components/Bar/RobotLiquidsList.js` — connect to `state.bar`, render each entry as `"ingredient (type)"` or `"ingredient"`, show empty-state message when bar is empty

## 3. Bar Page Refactor

- [x] 3.1 Remove the top-level standalone `<List>` of bar items from `src/components/Bar.js`
- [x] 3.2 Replace `<CocktailGauge />` with `<RobotLiquidsList />` in the stats grid in `src/components/Bar.js`

## 4. Tests & Snapshots

- [x] 4.1 Run `npm test -- -u` to update snapshots; verify no unintended failures
