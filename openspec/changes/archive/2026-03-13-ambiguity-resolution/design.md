## Context

The robot dispenser resolves which physical bottle to pour from by matching recipe `ingredient` fields against bar entries by `type`. When two bar slots share the same type (e.g. two gins), the first match is used — arbitrary and potentially wrong.

Recipe ingredients already have an optional `label` field that carries a specific brand name (e.g. `"Momentum Holy Basil Gin"`). This field was unused in dispense resolution.

## Goals / Non-Goals

**Goals:**

- Use `label` as a brand preference hint: if a bar entry's `ingredient` matches the recipe label, prefer it over a generic type match.
- Fall back silently to type-based matching when no label match exists.
- Zero UI change — resolution is transparent to the user.

**Non-Goals:**

- Per-user or per-settings brand preferences (backlog).
- UI for resolving ambiguity at dispense time (backlog).
- Case-insensitive label matching (recipe labels and robot config names are both admin-controlled and expected to be consistent).

## Decisions

**D1: Label match before type match**

```
resolveDispensableIngredients priority:
  1. b.ingredient === item.label   (brand-specific, if label present)
  2. b.type === item.ingredient    (generic type match)
  3. b.ingredient === item.ingredient  (exact name match, legacy)
```

Alternative considered: type match first, label as tiebreaker. Rejected — a recipe with a label is explicitly requesting a brand; overriding it defeats the purpose.

**D2: Silent fallback, no error**

If the labeled bottle isn't in the bar, fall back to any matching type. The user already approved the ingredient list on the pre-mix screen.

Alternative considered: warn the user when label doesn't match. Rejected — adds UI complexity for an edge case the admin should handle by keeping the bar stocked.

**D3: Change confined to `resolveDispensableIngredients`**

The label-first logic is self-contained in one function. No selector, reducer, or data-layer changes needed.

## Risks / Trade-offs

- **Label/config name mismatch** → If the recipe label doesn't exactly match the robot config's liquid name, the fallback silently kicks in. Mitigation: admin-controlled data, no end-user impact.
- **Case sensitivity** → Labels must match robot config names exactly. Mitigation: same admin-controlled authoring environment for both.
