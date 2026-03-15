## Why

The CocktailGauge (circular progress bar) in the Bar page stats grid conveys little actionable info — a fraction of makeable cocktails is already visible in the MakeableCocktails panel. Now that the robot supports a named liquids configuration (`--liquids liquids.json`), the more useful thing to surface in that slot is the exact list of liquids the robot has loaded, giving the user a clear at-a-glance inventory of what the robot can dispense.

## What Changes

- Remove the `CocktailGauge` component from the Bar page stats grid.
- Replace it with a new `RobotLiquidsList` component that renders the configured liquids from `state.bar` (robot-synced, resolved entries with ingredient + optional type).
- The top-level duplicate list currently rendered above the stats grid in `Bar.js` is also removed — the new panel in the grid becomes the canonical liquids display.
- Update `dev-robot.js` start script to pass the `--liquids` flag to the mock server (using `examples/mock-server/liquids.json` by default).

## Capabilities

### New Capabilities

- `bar-liquids-list`: A read-only panel in the Bar stats grid that lists each configured robot liquid (name and type). Replaces `CocktailGauge` in the grid layout.

### Modified Capabilities

- `robot-bar`: The Bar page layout requirement changes — the CocktailGauge is removed; the liquids list moves from a standalone block into the stats grid panel.

## Impact

- `src/components/Bar/CocktailGauge.js` — removed (or kept but no longer rendered in Bar)
- `src/components/Bar.js` — remove top-level list; swap `CocktailGauge` for new `RobotLiquidsList`
- `src/components/Bar/RobotLiquidsList.js` — new component
- `scripts/dev-robot.js` — add `--liquids examples/mock-server/liquids.json` flag to mock server invocation (already documented in header; make it the actual default in code)
- No Redux, selector, or API changes required
