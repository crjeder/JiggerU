## Context

The Bar page (`src/components/Bar.js`) currently renders two separate liquids displays:

1. A top-level `<List>` of `state.bar` items (ingredient + type)
2. A stats grid containing `MakeableCocktails`, `CocktailGauge`, and `PopularIngredients`

The gauge is a `react-circular-progressbar` showing makeable/total cocktails — information already conveyed by the `MakeableCocktails` panel. The new `--liquids` flag on the mock server makes liquids explicit and named, so surfacing them in the UI is now meaningful.

## Goals / Non-Goals

**Goals:**

- Replace `CocktailGauge` in the stats grid with a `RobotLiquidsList` panel showing `state.bar` entries
- Consolidate the two separate liquids displays into one (remove the standalone top-level list, use the grid panel instead)
- Update `scripts/dev-robot.js` to pass `--liquids examples/mock-server/liquids.json` to the mock server

**Non-Goals:**

- Showing raw `state.robot.robotConfig` (physical position/calibration data) — only the resolved `state.bar` entries are shown
- Any interactive controls on the liquids list (it remains read-only)
- Removing `CocktailGauge.js` from the codebase (keep it for potential future reuse, just stop rendering it)

## Decisions

**Use `state.bar` as the data source, not `state.robot.robotConfig`**

`state.bar` holds resolved `{ ingredient, type }` entries — the same data already driving the makeable filter and bar page list. `robotConfig` is a raw physical config (position, calibration) that is less useful in the UI context and requires extra processing. Consistent with existing robot-bar spec.

**New `RobotLiquidsList` component, not inline JSX**

The current top-level list in `Bar.js` is inline JSX. A dedicated component matches the pattern of `MakeableCocktails` and `PopularIngredients`, and keeps the grid slots self-contained.

**Remove top-level list from `Bar.js`**

With the grid panel showing the full liquids list, the duplicate top-level list becomes redundant. Removing it simplifies the page layout without losing any information.

**Grid layout: give `RobotLiquidsList` the `md={3}` slot currently held by `CocktailGauge`**

The three-panel grid (`md=3 | md=3 | md=6`) stays the same shape. The liquids list is compact enough for a narrow column; `PopularIngredients` keeps its wider `md=6` slot.

## Risks / Trade-offs

- **CocktailGauge loses discoverability** — it won't appear anywhere in the UI after this change. Mitigated by keeping the file in the codebase.
- **No gauge info** — users lose the quick visual fraction of makeable cocktails. Mitigated by `MakeableCocktails` still showing the count and the filtered list being a tap away.
- **dev-robot.js change is an existing default** — the script header already documents `--liquids` usage; the code just doesn't pass it yet. Low risk.
