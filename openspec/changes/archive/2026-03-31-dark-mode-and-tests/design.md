## Context

Projekt Snake to prosta gra webowa z backendem Flask i frontendem Vanilla JS. Aktualnie brak jest:
- Testów automatycznych (zarówno backend jak i frontend)
- Obsługi ciemnego motywu (CSS variables nie są używane)

Wymagania: kompatybilność z istniejącym kodem, prostota implementacji, łatwość utrzymania.

## Goals / Non-Goals

**Goals:**
- Zaimplementować ciemny motyw z wykorzystaniem CSS variables
- Dodać testy backendu z pytest + pytest-flask
- Dodać testy frontendu z Jest
- Zachować istniejącą funkcjonalność bez regresji

**Non-Goals:**
- Dodawanie toggle'a motywu (jasny/ciemny) - tylko ciemny motyw
- Refaktoryzacja logiki gry
- Zmiana API endpoints
- Dodanie TypeScript

## Decisions

### 1. CSS Variables dla motywu

**Decyzja:** Użycie CSS custom properties (variables) z predefiniowanymi wartościami ciemnego motywu.

```css
:root {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #eaeaea;
    --text-secondary: #b8b8b8;
    --accent-color: #4CAF50;
    --food-color: #f44336;
    --game-bg: #0f0f1a;
}
```

**Alternatywy rozważane:**
- Inline styles z JS (nie, nie skalowalne)
- Osobne pliki CSS dla każdego motywu (nie, redundancja)

### 2. Backend Tests - pytest + pytest-flask

**Decyzja:** Użycie pytest z pytest-flask fixture.

```
tests/
├── conftest.py          # Fixtures (app, client)
├── test_api.py          # Testy endpointów
```

**Alternatywy rozważane:**
- unittest (mniej popularny, mniej czytelny)
- pytest-only bez flask plugin (trudniejsze fixture)

### 3. Frontend Tests - Jest

**Decyzja:** Użycie Jest z izolacją testów od DOM.

```javascript
// Mock Canvas API
// Mock fetch API
// Test pure game logic functions
```

**Alternatywy rozważane:**
- Vitest (nowszy, ale Jest jest standardem)
- Cypress (e2e, nie jednostkowe)
- Brak mockowania (testy by były wolne i niestabilne)

### 4. Struktura plików testowych

**Backend:**
```
tests/
├── __init__.py
├── conftest.py
└── test_api.py
```

**Frontend:**
```
static/js/
├── game.js
└── game.test.js
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Testy frontendu wymagają mockowania Canvas API | Stworzyć helper functions do testowania logiki osobno od renderingu |
| Flask tests modyfikują prawdziwy plik scores.json | Użyć tmp_path fixture lub izolacji testów |
| Zmiana CSS może zepsuć istniejący layout | Zachować strukturę HTML, zmieniać tylko kolory |

## Open Questions

- Czy potrzebny jest setup CI/CD dla testów?
- Czy wymagana jest minimalna pokrycie testami (%)?

## Dependencies

### Python
```
pytest>=7.0.0
pytest-flask>=1.3.0
```

### JavaScript (package.json)
```json
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```
