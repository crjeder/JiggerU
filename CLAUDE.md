# Cocktails Browser — CLI Guide

## Commands

- Dev: `npm start`
- Test: `npm test` | Update Snapshots: `npm test -- -u`
- Build: `npm run build`

## Session Workflow

### Start

1. Read `claude-progress.txt` (create if missing).
2. Check `git log --oneline -5`.
3. Reference `@openspec/config.yaml` for data schemas and tech stack.

### End

1. Sync `README.md`, `TODO.md`
1. Sync `claude-progress.txt` reference openspec proposal, prune finished items
1. Update `CHANGELOG.md` (keepachangelog.com v1.1.0).
1. Update `config.yaml` if architecture or features changed.
1. Finalize with `/commit-push-pr`.

## Quality Standards

- **Components:** 100% Functional + Hooks. No Class components.
- **Tests:** Co-locate `*.spec.js`. Always verify snapshots after UI changes.
- **State:** Logic flows: `actionTypes` -> `actions` -> `reducers` -> `selectors`.
- **Git:** No `package-lock.json` changes unless `package.json` was modified.
- **Formatting:** Prettier is mandatory (via Husky). Do not `--no-verify`.
- **Learning:** Update CLAUDE.md to avoid making the same mistake again.

## Key Architecture

- **Data:** Static JSON in `src/data/`. LocalStorage only. No DB.
- **Style:** MUI v4 System. Theme in `src/theme.js`.
