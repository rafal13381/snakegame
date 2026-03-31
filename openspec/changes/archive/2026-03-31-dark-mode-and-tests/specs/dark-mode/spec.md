# Dark Mode

## ADDED Requirements

### Requirement: CSS Variables for Theme Colors
The system SHALL use CSS custom properties (variables) for all theme-related colors to enable easy theme switching.

#### Scenario: Default dark theme on load
- **WHEN** user loads the application
- **THEN** the dark theme SHALL be applied by default

#### Scenario: Color palette
- **WHEN** dark theme is active
- **THEN** the background SHALL be dark (#1a1a2e or similar)
- **AND** the text SHALL be light (#eaeaea or similar)
- **AND** the sidebar background SHALL contrast with main background
- **AND** buttons SHALL have visible hover states

### Requirement: Game Canvas Dark Theme
The game canvas SHALL maintain visibility of game elements in dark mode.

#### Scenario: Snake visibility
- **WHEN** dark theme is active
- **THEN** the snake head SHALL remain green (#4CAF50)
- **AND** the snake body SHALL remain light green (#81C784)

#### Scenario: Food visibility
- **WHEN** dark theme is active
- **THEN** the food SHALL remain clearly visible (red #f44336)

#### Scenario: Game board visibility
- **WHEN** dark theme is active
- **THEN** the game board background SHALL be dark (#16213e or similar)
- **AND** the grid lines SHALL be subtle but visible

### Requirement: Overlay Styling
The start and game over overlays SHALL be styled consistently with dark theme.

#### Scenario: Start screen overlay
- **WHEN** user sees the start screen
- **THEN** the overlay background SHALL be semi-transparent dark
- **AND** the "Zacznij Grę" button SHALL be styled appropriately

#### Scenario: Game over overlay
- **WHEN** user sees the game over screen
- **THEN** the overlay SHALL display final score
- **AND** the name input field SHALL have dark theme styling
- **AND** the "Zapisz wynik" button SHALL be visible and styled

### Requirement: Score List Styling
The high scores sidebar SHALL be readable in dark mode.

#### Scenario: Score list display
- **WHEN** high scores are displayed
- **THEN** each score SHALL have sufficient contrast
- **AND** the list markers SHALL be visible
