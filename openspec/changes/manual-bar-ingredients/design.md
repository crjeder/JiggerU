## Context

`state.bar` is populated exclusively by `useRobotBar` via `ROBOT_BAR_SYNCED`, which maps robot pump slots to ingredient entries `{ ingredient, type }`. Non-dispensable ingredients (garnishes, herbs, eggs) are never registered in this slice, so the `makeableFrom` filter and `makeableCocktailsSelector` — both of which derive available ingredients from `barSelector` — produce incorrect results for cocktails requiring manual prep items.

The app already handles the dispensable/manual split correctly at dispense time (`DispenseWorkflow.resolveDispensableIngredients`); the gap is purely in the filter layer.

## Goals / Non-Goals

**Goals:**

- Allow a static runtime config file (`public/manual-ingredients.json`) to declare non-robot ingredients present at the bar
- Expose those ingredients to the filter/selector layer without modifying any filter logic
- Degrade gracefully when the file is absent (404 → no-op)

**Non-Goals:**

- UI for managing manual ingredients — this is operator config, not user-facing
- Alias resolution for manual ingredients — names must match recipe ingredient strings exactly
- Persisting manual ingredients to localStorage

## Decisions

### Virtual union in barSelector, not a merge in the reducer

**Decision:** `barSelector` returns `[...state.bar, ...state.manualBar.map(i => ({ ingredient: i, type: i }))]`. The two slices stay separate in the Redux store.

**Alternatives considered:**

- Merge into `state.bar` in the reducer on `MANUAL_INGREDIENTS_LOADED` — rejected because `ROBOT_BAR_SYNCED` replaces `state.bar` wholesale, creating a race condition that would silently drop manual ingredients on reconnect.
- Merge in reducer on `ROBOT_BAR_SYNCED` — rejected because it couples unrelated concerns and requires the reducer to know about `manualBar` at sync time.

**Rationale:** Keeping slices separate preserves clear ownership. The selector union is the natural place to compose them; all consumers (`filteredCocktailsSelector`, `makeableCocktailsSelector`, `filterConfig.barOnly`) already go through `barSelector` so no further changes are needed downstream.

### Fetch from `public/` at runtime, not a bundled import

**Decision:** Load `public/manual-ingredients.json` via `fetch` at startup, not a static `import`.

**Alternatives considered:**

- `import manualIngredients from '../data/manual-ingredients.json'` — simpler, but requires a redeploy to update ingredients. Ruled out because the point is operator-level config that should be adjustable without touching code.

**Rationale:** Serving from `public/` matches the "configured at startup" pattern already used by the robot sync. The file is optional; a 404 is a valid "no manual ingredients" signal.

### Simple string array format

**Decision:** `public/manual-ingredients.json` is `["Basil", "Mint", "Egg white"]`.

**Rationale:** Names must match recipe ingredient strings. No alias resolution is applied, keeping the implementation trivial. Operators control this file and can look up the exact name from the recipe data.

## Risks / Trade-offs

- **Name mismatch**: If a recipe uses "Fresh mint" but the config says "Mint", the ingredient won't match. → Mitigation: document that names must match recipe strings exactly; operators can verify against `cocktails.json`.
- **No alias support**: Brand-name spirits (e.g. "Momentum Holy Basil Gin") in the manual file won't resolve to their generic type. → Acceptable — manual ingredients are expected to be generics (garnishes, herbs, mixers).
- **File optional but silent**: A missing file produces no user-visible indication that manual ingredients aren't loaded. → Acceptable given this is operator config, not a user feature.

## Migration Plan

1. Deploy with no `public/manual-ingredients.json` — behaviour is identical to today (no-op fetch).
2. Operator creates `public/manual-ingredients.json` with desired ingredients; next page load picks them up.
3. No rollback needed — removing the file reverts to robot-only bar.
