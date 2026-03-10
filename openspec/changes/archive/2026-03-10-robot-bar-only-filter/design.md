## Context

The app already has a `barOnly` filter in `filterConfig.js` and an `activeFilters` array in `state.filterOptions`. The robot connection state lives in `state.robot.connected`. The filter UI (`CocktailFilter.js`) renders an "Add Filter" button that opens a menu, and `FilterChips.js` renders active filters as dismissible chips.

Currently there is no coupling between robot connection and filter state: users manually add/remove filters regardless of robot status.

## Goals / Non-Goals

**Goals:**

- Ensure `barOnly` is always active (and the only enforceable filter) when robot is connected
- Prevent the user from removing `barOnly` or adding other filters while robot is connected
- When robot disconnects, restore normal filter controls (the barOnly filter may remain active — it was already there)

**Non-Goals:**

- Persisting the locked state across page reloads (not needed; robot reconnection re-locks)
- Clearing other active filters when robot connects (only barOnly must be present; others may coexist silently or be hidden)
- Changing the actual filter algorithm or `filterConfig.js`

## Decisions

### Decision: Derive locked state from `state.robot.connected` in components, not in the reducer

**Chosen:** Read `state.robot.connected` in `CocktailFilter` and `FilterChips` via `mapStateToProps` to derive UI locking.

**Alternative considered:** Dispatch an action on robot connect that mutates `filterOptions.activeFilters` to inject `barOnly`. This would auto-activate the filter without component changes, but it couples filter state to robot events in the reducer, making it harder to reason about filter state and harder to test independently.

**Rationale:** UI locking is a presentational concern. Keeping filter state pure (driven only by user intent) and letting components derive locked presentation from robot state is simpler and more reversible.

### Decision: Ensure barOnly is always present in activeFilters when robot is connected — enforce via selector

**Chosen:** Create a `effectiveActiveFilters` selector that returns `activeFilters` with `barOnly` injected when `state.robot.connected` is true. Components read from this selector.

**Alternative considered:** Dispatch `updateFilter` with `barOnly` added when robot connects. This mutates persisted state and could leave a stale `barOnly` filter after disconnect if the user never removes it.

**Rationale:** Selector-based injection is side-effect-free and transparent — the stored `filterOptions.activeFilters` is untouched, and the enforced filter disappears automatically when the robot disconnects.

## Risks / Trade-offs

- [Risk] User has other active filters when robot connects — those chips will still show but the barOnly chip will be locked. This could be slightly confusing.
  → Mitigation: Out of scope for this change; a future refinement could hide non-barOnly chips in robot mode.

- [Risk] If `state.robot.connected` briefly flickers (connect/disconnect race), the filter lock may flash on and off.
  → Mitigation: The existing reconnect backoff in `useRobotConnection` already debounces connect events; no additional mitigation needed.

## Open Questions

- Should other active filters be hidden (not just non-deletable) when the robot is connected? Deferred — current scope only locks barOnly.
