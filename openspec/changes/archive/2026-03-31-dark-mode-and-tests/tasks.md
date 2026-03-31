## 1. Setup - Zależności

- [x] 1.1 Dodać pytest i pytest-flask do requirements.txt
- [x] 1.2 Zainicjalizować package.json dla frontendu (jeśli nie istnieje)
- [x] 1.3 Dodać jest do devDependencies w package.json
- [x] 1.4 Skonfigurować jest.config.js

## 2. Dark Mode - CSS

- [x] 2.1 Dodać CSS variables w style.css dla ciemnego motywu
- [x] 2.2 Zaktualizować body i app-container z zmiennymi
- [x] 2.3 Zaktualizować sidebar styling
- [x] 2.4 Zaktualizować overlay styling (start screen, game over)
- [x] 2.5 Zaktualizować input i button styling
- [x] 2.6 Zaktualizować high scores list styling
- [x] 2.7 Upewnić się że canvas game board ma ciemne tło

## 3. Backend Tests - Struktura

- [x] 3.1 Stworzyć katalog tests/
- [x] 3.2 Stworzyć tests/__init__.py
- [x] 3.3 Stworzyć tests/conftest.py z app fixture
- [x] 3.4 Stworzyć tests/test_api.py

## 4. Backend Tests - Implementacja

- [x] 4.1 Test GET /api/scores - pusta lista
- [x] 4.2 Test GET /api/scores - posortowane wyniki
- [x] 4.3 Test GET /api/scores - limit 10 wyników
- [x] 4.4 Test POST /api/scores - poprawny wynik
- [x] 4.5 Test POST /api/scores - brakujące pola
- [x] 4.6 Test persystencji wyników

## 5. Frontend Tests - Struktura

- [x] 5.1 Stworzyć static/js/game.test.js
- [x] 5.2 Skonfigurować mocks dla Canvas API
- [x] 5.3 Skonfigurować mocks dla fetch API

## 6. Frontend Tests - Implementacja

- [x] 6.1 Test początkowej pozycji węża
- [x] 6.2 Test ruchu poziomego
- [x] 6.3 Test ruchu pionowego
- [x] 6.4 Test kolizji ze ścianami (4 kierunki)
- [x] 6.5 Test kolizji z własnym ciałem
- [x] 6.6 Test zjadania jedzenia
- [x] 6.7 Test braku zjadania jedzenia
- [x] 6.8 Test blokady zmiany kierunku (zapobieganie cofania)
- [x] 6.9 Test losowego położenia jedzenia

## 7. Weryfikacja

- [x] 7.1 Uruchomić pytest i sprawdzić wszystkie testy backendu
- [x] 7.2 Uruchomić jest i sprawdzić wszystkie testy frontendu
- [ ] 7.3 Przetestować grę manualnie w przeglądarce
