## Context

The app was forked from a general cocktail browser where users manually curate a "My Bar" ingredient list. In this deployment, a CocktailBot HAL robot is the sole source of bar inventory — it reports exactly what physical liquids are loaded. The existing codebase carries both worlds: robot sync logic alongside manual `SET_BAR`/`ADD_TO_BAR` actions, a `source` field on bar entries to distinguish origin, and an `IngredientPicker` UI.

The ingredient matching logic uses `item.type || item.ingredient` to derive a single effective name per bar item. This works for generic recipe ingredients (IBA cocktails all use generic names like "Gin", "Vodka") but silently fails for brand-specific ingredients in custom cocktails (e.g. a recipe requesting "Momentum Gin" will not match a bar entry `{ ingredient: "Momentum Gin", type: "Gin" }` because the effective name collapses to "Gin").

## Goals / Non-Goals

**Goals:**

- Bar state reflects only what the robot has loaded; no manual editing
- Brand-specific recipe ingredients match the exact bar item; generic recipe ingredients match any bar item of that type
- `source` field removed — it is no longer needed when all bar items share the same origin
- Unrecognised-liquid wizard pre-populates its type guess from the liquid name
- Bar page shows a read-only view of robot-loaded liquids

**Non-Goals:**

- Ambiguity resolution when multiple bar items share the same type and a recipe uses a generic name (e.g. two gins → which pours?) — tracked in TODO
- Custom cocktail CRUD UI — tracked in TODO
- Per-cocktail brand override configuration ("allow any Gin where recipe says Momentum Gin") — tracked in TODO

## Decisions

### 1. Bar entry shape — remove `source`, keep `type`

**Decision:** Bar entries become `{ ingredient: string, type?: string }`. The `source` field is dropped entirely.

**Rationale:** `source` was the only way to distinguish robot items from manual items. With manual items gone, there is nothing to distinguish. `type` is still needed: it is the bridge between the physical liquid name ("Smirnoff") and the generic recipe ingredient ("Vodka").

**Alternative considered:** Keep `source: "robot"` as a defensive marker for future multi-source scenarios. Rejected — YAGNI; adds dead field and dead code paths.

### 2. Ingredient matching — flatMap both `type` and `ingredient`

**Decision:** Replace `bar.map(item => item.type || item.ingredient)` with `bar.flatMap(item => [item.type, item.ingredient].filter(Boolean))` in both `filterConfig.js` and `selectors/index.js`.

**Rationale:** Each bar item satisfies two possible recipe references: its generic type ("Gin") and its exact brand name ("Momentum Gin"). Exposing both means:

- Generic recipe ingredient "Gin" → matched via `type: "Gin"` on any gin bar entry ✓
- Brand recipe ingredient "Momentum Gin" → matched via `ingredient: "Momentum Gin"` on only that entry ✓
- Brand recipe "Momentum Gin" when only "The Ilusionist" is in bar → "Momentum Gin" absent from the set → not makeable ✓

No special case or alias-table lookup needed at match time; the flatMap is the complete fix.

**Alternative considered:** Check alias table at match time to distinguish generic vs. brand recipe ingredients. Rejected — adds complexity and couples the filter to settings state.

### 3. Robot bar sync reducer — replace, not merge

**Decision:** On `ROBOT_BAR_SYNCED`, set `draft.bar = action.payload.barEntries` unconditionally.

**Rationale:** With no manual entries to preserve, the robot's report is authoritative. Merging is unnecessary complexity.

**Alternative considered:** Keep merge logic in case future sources are added. Rejected — premature; can be reintroduced if multi-source is ever needed.

### 4. Bar page — read-only robot inventory, keep stats

**Decision:** `Bar.js` keeps `MakeableCocktails`, `CocktailGauge`, and `PopularIngredients`. Replace `IngredientPicker` with a simple list of robot-loaded bar items showing `ingredient (type)` pairs.

**Rationale:** The stats are useful at a glance. The ingredient picker is the only thing tied to manual management; removing it is minimal surgery.

### 5. DispenseWorkflow / CocktailDetail — in-bar check replaces source check

**Decision:**

- `hasDispensable` (CocktailDetail): `bar.some(item => item.source === "robot" && ...)` → `bar.some(item => cocktailIngredient matches item)`
- Manual step detection (DispenseWorkflow): `barEntry.source !== "robot"` → `!barEntry` (ingredient not found in bar at all)

**Rationale:** "Robot-dispensable" is now synonymous with "in bar". The bar only contains robot items.

### 6. Wizard pre-population — substring match

**Decision:** When rendering an unrecognised liquid in the Settings wizard, compute a suggested type by finding the first alias key that appears as a case-insensitive substring of the liquid name. Set that as the `defaultValue` of the select.

```
"Momentum Gin"  → "gin" found in alias keys → suggests "Gin"
"Valensina"     → no alias key is a substring → no suggestion (blank)
```

**Rationale:** Simple, deterministic, requires no fuzzy-matching library. Covers the common case (brand names that include the spirit type).

**Alternative considered:** Fuzzy matching (Levenshtein, trigrams). Rejected — overkill for a wizard hint; admin can always correct it.

## Risks / Trade-offs

- **Snapshot tests will break** — `Bar.js` and any component reading bar state shape will produce different snapshots. Must run `npm test -- -u` to update. → Acceptable; snapshots are intentionally updated when views change.
- **Legacy localStorage bar data** — existing users may have `source: "manual"` entries in persisted state. The reducer's `migrateBarItem` normaliser currently handles old string entries; after this change it is removed. On first load, old bar entries (both string and object) will be wiped and replaced by robot sync. → Acceptable given the robot is the authoritative source; the bar repopulates on next connect.
- **No undo for bar** — previously a user could manually remove an ingredient; now the bar is read-only. Robot reconnect is the only way to resync. → Acceptable; it matches the intended UX.

## Migration Plan

1. Remove `SET_BAR`, `ADD_TO_BAR` action types and reducer cases
2. Remove `migrateBarItem` and the startup migration loop
3. Drop `source` from all bar entry creation and all bar entry checks
4. Apply flatMap fix to `filterConfig.js` and `selectors/index.js`
5. Rewrite `Bar.js` (remove `IngredientPicker`, add robot item list)
6. Delete `IngredientPicker.js`
7. Update `DispenseWorkflow.js` and `CocktailDetail.js`
8. Add wizard pre-population to `Settings.js`
9. Update snapshots: `npm test -- -u`
10. Update `TODO.md` with deferred items

No backend changes. No deployment coordination required.

## Open Questions

- Should the Bar page show a "Robot not connected" empty state, or just show an empty list? (Minor UX detail, can decide during implementation.)
