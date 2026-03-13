## 1. Core Implementation

- [x] 1.1 Update `resolveDispensableIngredients()` in `DispenseWorkflow.js` to match `item.label` against `b.ingredient` before falling back to type matching

## 2. Tests

- [x] 2.1 Add unit tests for `resolveDispensableIngredients` covering: label match preferred, label absent falls back to type, no label uses type as before

## 3. Documentation

- [x] 3.1 Update `CHANGELOG.md` with the ambiguity resolution feature
- [x] 3.2 Mark `Ambiguity resolution` item done in `TODO.md`
- [x] 3.3 Sync `claude-progress.txt`
