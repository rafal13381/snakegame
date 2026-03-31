# Frontend Tests

## ADDED Requirements

### Requirement: Jest Test Setup
The frontend SHALL have Jest configured for running JavaScript unit tests.

#### Scenario: Jest configuration
- **WHEN** tests are run with `npm test`
- **THEN** Jest SHALL discover and run all `*.test.js` files

### Requirement: Snake Movement
The snake SHALL move in the correct direction based on velocity values.

#### Scenario: Initial position
- **WHEN** game starts
- **THEN** snake SHALL have initial position at center (10, 10)

#### Scenario: Horizontal movement
- **WHEN** velocityX is 1 and velocityY is 0
- **THEN** snake head X position SHALL increase by 1 each update

#### Scenario: Vertical movement
- **WHEN** velocityX is 0 and velocityY is 1
- **THEN** snake head Y position SHALL increase by 1 each update

### Requirement: Wall Collision Detection
The game SHALL detect when the snake collides with the game board boundaries.

#### Scenario: Left wall collision
- **WHEN** snake head X position is less than 0
- **THEN** game over SHALL be triggered

#### Scenario: Right wall collision
- **WHEN** snake head X position is >= 20
- **THEN** game over SHALL be triggered

#### Scenario: Top wall collision
- **WHEN** snake head Y position is less than 0
- **THEN** game over SHALL be triggered

#### Scenario: Bottom wall collision
- **WHEN** snake head Y position is >= 20
- **THEN** game over SHALL be triggered

### Requirement: Self Collision Detection
The game SHALL detect when the snake collides with its own body.

#### Scenario: Self collision
- **WHEN** snake head position matches any body segment position
- **THEN** game over SHALL be triggered

#### Scenario: No self collision
- **WHEN** snake head is in a new position not occupied by body
- **THEN** game SHALL continue normally

### Requirement: Food Eating
The snake SHALL grow when eating food and gain points.

#### Scenario: Food eaten
- **WHEN** snake head position matches food position
- **THEN** snake length SHALL increase by 1
- **AND** score SHALL increase by 10
- **AND** new food SHALL be generated

#### Scenario: No food eaten
- **WHEN** snake head position does not match food position
- **THEN** snake length SHALL remain the same
- **AND** score SHALL remain the same

### Requirement: Direction Change Prevention
The snake SHALL NOT be able to reverse direction directly.

#### Scenario: Cannot reverse up to down
- **WHEN** snake is moving up (velocityY = -1)
- **THEN** pressing down key SHALL be ignored

#### Scenario: Cannot reverse left to right
- **WHEN** snake is moving left (velocityX = -1)
- **THEN** pressing right key SHALL be ignored

### Requirement: Food Random Generation
Food SHALL be placed at random grid positions.

#### Scenario: Food position bounds
- **WHEN** new food is generated
- **THEN** food X position SHALL be between 0 and 19
- **AND** food Y position SHALL be between 0 and 19

#### Scenario: Food is integer position
- **WHEN** new food is generated
- **THEN** food positions SHALL be whole numbers (integers)
