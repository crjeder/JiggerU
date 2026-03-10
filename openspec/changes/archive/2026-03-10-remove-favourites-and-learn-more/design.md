## Context

The app has a "Favourites" feature backed by Redux (action types, actions, reducer, selectors) and persisted to localStorage. It was part of the original IBA cocktails browser but was never wired to any filter or surfaced in a dedicated view, making it invisible to users. The "Learn more" button appears on cocktail cards and links to the cocktail detail page — identical to clicking the card itself.

Both features are confirmed dead weight per TODO.md backlog items.

## Goals / Non-Goals

**Goals:**

- Delete all Favourites-related Redux code (action types, creators, reducer, selectors, store wiring)
- Remove the heart/favourite toggle from every UI location
- Remove the "Learn more" button from cocktail cards
- Update/remove all associated tests and snapshots

**Non-Goals:**

- localStorage migration (no cleanup of existing `favourites` key — harmless orphan)
- Adding any replacement feature
- Touching unrelated Redux slices

## Decisions

**Delete rather than feature-flag** — the feature has no users or dependents. A hard delete is cleaner than leaving dead code behind a flag. No rollback concern since it's removed functionality.

**Snapshot updates via `npm test -- -u`** — snapshots will break after UI changes; they should be regenerated as part of the implementation, not manually edited.

**Search codebase before deleting** — grep for `favourite`/`favorites` (both spellings) to catch all references before removal. The project uses British spelling (`favourite`) throughout.

## Risks / Trade-offs

- `localStorage` key `favourites` will be orphaned in existing installs → no user impact, no data loss risk
- If any spec or external integration references favourites it would break → low risk, no external API exposes this

## Migration Plan

No deployment migration needed. Feature is client-only; removing it from the bundle is sufficient. Old localStorage data is silently ignored.
