# Backend Tests

## ADDED Requirements

### Requirement: Test Environment Setup
The test environment SHALL be properly configured with pytest and pytest-flask.

#### Scenario: Dependencies installed
- **WHEN** tests are run
- **THEN** `pytest` and `pytest-flask` SHALL be available
- **AND** Flask app SHALL be testable via `client` fixture

### Requirement: GET /api/scores Returns Empty List
The endpoint SHALL return an empty JSON array when no scores exist.

#### Scenario: Empty scores file
- **WHEN** GET request is made to `/api/scores`
- **AND** no scores exist in the file
- **THEN** response status SHALL be 200
- **AND** response body SHALL be `[]`

### Requirement: GET /api/scores Returns Top 10 Scores
The endpoint SHALL return scores sorted by score in descending order, limited to top 10.

#### Scenario: Multiple scores returned sorted
- **WHEN** GET request is made to `/api/scores`
- **AND** there are more than 10 scores
- **THEN** response SHALL contain exactly 10 scores
- **AND** scores SHALL be sorted from highest to lowest

#### Scenario: Single score returned
- **WHEN** GET request is made to `/api/scores`
- **AND** there is exactly one score
- **THEN** response SHALL contain that single score

### Requirement: POST /api/scores Saves New Score
The endpoint SHALL accept a valid score and save it to the JSON file.

#### Scenario: Valid score submission
- **WHEN** POST request is made to `/api/scores` with `{"player": "Test", "score": 100}`
- **THEN** response status SHALL be 200
- **AND** response body SHALL be `{"status": "ok"}`
- **AND** the score SHALL be persisted in scores.json

### Requirement: POST /api/scores Validates Input
The endpoint SHALL validate required fields in the request body.

#### Scenario: Missing player field
- **WHEN** POST request is made with `{"score": 100}`
- **THEN** response SHALL have appropriate error handling

#### Scenario: Missing score field
- **WHEN** POST request is made with `{"player": "Test"}`
- **THEN** response SHALL have appropriate error handling

### Requirement: Score Persistence
Scores SHALL be persisted across application restarts.

#### Scenario: Scores persist
- **WHEN** a score is saved
- **AND** the application is restarted
- **THEN** the score SHALL still be accessible via GET
