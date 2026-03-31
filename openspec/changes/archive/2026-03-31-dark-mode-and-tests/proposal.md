## Why

Obecny interfejs gry Snake ma domyślny jasny motyw przeglądarki. Dodanie ciemnego motywu poprawi komfort gry (szczególnie przy dłuższych sesjach) oraz doda profesjonalnego wyglądu. Dodatkowo, brak testów automatycznych utrudnia rozwój projektu i weryfikację poprawności działania.

## What Changes

- Dodanie ciemnego motywu CSS (dark mode) dla całej aplikacji
- Dodanie testów jednostkowych dla backendu (pytest + pytest-flask)
- Dodanie testów jednostkowych dla frontendu (Jest)
- Refaktoryzacja CSS z wykorzystaniem CSS variables dla łatwej zmiany motywu

## Capabilities

### New Capabilities

- `dark-mode`: Ciemny motyw interfejsu z kolorami dostosowanymi do gry
- `backend-tests`: Testy jednostkowe API Flask (GET/POST /api/scores)
- `frontend-tests`: Testy jednostkowe logiki gry JavaScript (kolizje, ruch, zjadanie)

### Modified Capabilities

- (brak)

## Impact

- **Nowe pliki**: `tests/`, `static/css/style.css` (zmodyfikowany)
- **Nowe zależności**: `pytest`, `pytest-flask`, `jest`
- **Modyfikowane pliki**: `static/css/style.css`, `requirements.txt`
- **Brak zmian w API**: Istniejące endpointy pozostają bez zmian
