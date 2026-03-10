## ADDED Requirements

### Requirement: CocktailCard shows a "Mix it!" button when the robot is ready

The system SHALL render an action button at the bottom of `CocktailCard` when all of the following are true: the robot is connected, the robot state is `idle`, and at least one cocktail ingredient matches a liquid loaded on the robot. Clicking the button SHALL open the `DispenseWorkflow` dialog without navigating away from the browse view.

#### Scenario: Button visible when robot is idle and ingredient is available

- **WHEN** the robot is connected with state `idle`, and the cocktail contains at least one ingredient present on the robot
- **THEN** the card renders a button with the theme-defined label (default: "Mix it!") at the bottom

#### Scenario: Button absent when robot is not configured

- **WHEN** `settings.robot.url` is absent or empty
- **THEN** no button is rendered on the card

#### Scenario: Button absent when robot is connected but busy

- **WHEN** the robot state is `working`, `waiting_for_glass`, or `drink_ready`
- **THEN** no button is rendered on the card

#### Scenario: Button absent when no ingredients match the robot

- **WHEN** the robot is idle but none of the cocktail's ingredients are loaded on the robot
- **THEN** no button is rendered on the card

#### Scenario: Button click opens DispenseWorkflow dialog

- **WHEN** the user clicks the "Mix it!" button on a card
- **THEN** the `DispenseWorkflow` dialog opens for that cocktail, and the user remains on the browse page

#### Scenario: Dialog close returns to browse view

- **WHEN** the user dismisses the `DispenseWorkflow` dialog
- **THEN** the dialog closes and the browse view is unchanged
