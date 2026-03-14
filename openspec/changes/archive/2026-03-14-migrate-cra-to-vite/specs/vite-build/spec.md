## ADDED Requirements

### Requirement: Dev server starts with Vite

The system SHALL provide a Vite-based dev server as the development environment, replacing `react-scripts start`.

#### Scenario: Developer starts dev server

- **WHEN** developer runs `npm start`
- **THEN** a Vite dev server starts and serves the app with hot module replacement

### Requirement: Production build uses Vite

The system SHALL produce a production build using `vite build`, outputting to the `build/` directory.

#### Scenario: Build completes successfully

- **WHEN** developer runs `npm run build`
- **THEN** a production-optimised bundle is written to `build/` with no errors

#### Scenario: Output directory matches Netlify expectation

- **WHEN** a production build completes
- **THEN** the output directory is named `build/` (not `dist/`)

### Requirement: Tests run with Vitest

The system SHALL run all `*.spec.js` test files using Vitest, which provides a Jest-compatible API.

#### Scenario: Existing tests pass without modification

- **WHEN** developer runs `npm test`
- **THEN** all existing `*.spec.js` tests pass using Vitest

#### Scenario: Watch mode available

- **WHEN** developer runs `npm test` in an interactive terminal
- **THEN** Vitest runs in watch mode, re-running affected tests on file save

#### Scenario: Snapshot update flag works

- **WHEN** developer runs `npm test -- -u`
- **THEN** Vitest updates all outdated snapshots

### Requirement: Prettier and Husky hooks remain active

The system SHALL preserve the Husky pre-commit hook that runs `pretty-quick` after the migration.

#### Scenario: Commit triggers formatting check

- **WHEN** developer makes a git commit
- **THEN** `pretty-quick` runs via Husky and formats staged files

### Requirement: Static assets in public/ are served

The system SHALL serve files from the `public/` directory as static assets at the root URL path.

#### Scenario: Static asset accessible in dev

- **WHEN** a file exists in `public/` and the dev server is running
- **THEN** the file is accessible at the corresponding root path (e.g. `/favicon.ico`)
