## ADDED Requirements

### Requirement: Namespaced logger creation

The system SHALL provide a `createLogger(namespace)` factory function exported from `src/logger.js` that returns a logger object with `debug`, `info`, `warn`, and `error` methods.

#### Scenario: Logger prefixes output with namespace

- **WHEN** a logger is created with `createLogger("useRobotBar")` and `logger.warn("msg")` is called
- **THEN** the console output includes the namespace prefix `[useRobotBar]`

#### Scenario: Logger is imported as a named export

- **WHEN** a module does `import { createLogger } from '../logger'`
- **THEN** the import succeeds and `createLogger` is a function

### Requirement: Log level suppression in production

The system SHALL suppress `debug` and `info` level messages when `import.meta.env.MODE` is `"production"`. `warn` and `error` SHALL always be output regardless of environment.

#### Scenario: Debug suppressed in production

- **WHEN** the environment is `production` and `logger.debug("detail")` is called
- **THEN** nothing is written to the console

#### Scenario: Warn passes through in production

- **WHEN** the environment is `production` and `logger.warn("problem")` is called
- **THEN** `console.warn` is called with the message

#### Scenario: All levels active in development

- **WHEN** the environment is `development` and `logger.debug("trace")` is called
- **THEN** `console.debug` is called with the message

### Requirement: Replace ad-hoc console calls in hooks

The system SHALL replace all existing `console.warn` calls in `src/hooks/useRobotBar.js` and `src/hooks/useManualIngredients.js` with namespaced logger calls.

#### Scenario: useRobotBar uses logger

- **WHEN** `useRobotBar` fails to fetch robot config
- **THEN** the warning is emitted via `createLogger("useRobotBar").warn(...)` instead of a raw `console.warn`

#### Scenario: useManualIngredients uses logger

- **WHEN** `useManualIngredients` fails to load
- **THEN** the warning is emitted via `createLogger("useManualIngredients").warn(...)` instead of a raw `console.warn`
