# Gra Snake — Dokumentacja Projektu

## 1. Opis projektu

Gra Snake to klasyczna gra arcade, w której gracz steruje wężem poruszającym się po planszy. Celem jest zjadanie jedzenia (czerwonych kwadratów), co powoduje wydłużenie węża. Gra kończy się przy kolizji ze ścianą lub własnym ogonem.

## 2. Uruchomienie projektu

### Wymagania
- Python 3.x
- Flask (`pip install flask`)

### Uruchomienie
```bash
python app.py
```
Następnie otwórz przeglądarkę i przejdź do: `http://localhost:5000`

## 3. Struktura projektu

```
snakegame/
├── app.py              # Serwer Flask (backend)
├── scores.json         # Plik z wynikami (tworzony automatycznie)
├── templates/
│   └── index.html      # Główny szablon HTML
├── static/
│   ├── css/
│   │   └── style.css   # Style strony
│   └── js/
│       └── game.js     # Logika gry (frontend)
├── requirements.txt    # Zależności Pythona
└── README.md           # Dokumentacja
```

## 4. Architektura aplikacji

```
┌─────────────────────────────────────────────────────────┐
│                     PRZEGLĄDARKA                        │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────┐  │
│  │   Canvas    │  │   HTML UI    │  │  game.js      │  │
│  │  (500x500)  │  │  (overlays)  │  │  (199 linii) │  │
│  └─────────────┘  └─────────────┘  └───────────────┘  │
│                         │                               │
│                   fetch() │                               │
└───────────────────────────│─────────────────────────────┘
                            │ HTTP (REST API)
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    SERWER FLASK                         │
│                                                         │
│  GET  /api/scores   → pobiera wyniki (top 10)         │
│  POST /api/scores   → zapisuje nowy wynik             │
│                                                         │
│  scores.json (plik JSON)                               │
└─────────────────────────────────────────────────────────┘
```

## 5. Komponenty

### 5.1. Backend — `app.py`

**Funkcje:**

| Funkcja | Opis |
|---------|------|
| `czytaj_wyniki()` | Wczytuje wyniki z pliku `scores.json` |
| `zapisz_wyniki()` | Zapisuje wyniki do pliku `scores.json` |
| `pobierz_wyniki()` | Endpoint GET — zwraca top 10 wyników posortowanych malejąco |
| `dodaj_wynik()` | Endpoint POST — dodaje nowy wynik do listy |

**Format danych (scores.json):**
```json
[
  {"player": "Jan", "score": 150},
  {"player": "Anna", "score": 120}
]
```

### 5.2. Frontend — `game.js`

**Główne elementy:**

| Element | Opis |
|---------|------|
| `rozmiarKratki` | Rozmiar jednej komórki siatki (25px) |
| `pole` | Liczba kratek w jednym rzędzie (20) |
| `waz` | Tablica pozycji segmentów węża `[{x, y}, ...]` |
| `predkoscX/Y` | Kierunek ruchu (-1, 0, 1) |
| `petlaGry` | Interwał odświeżania (100ms = 10 FPS) |

**Logika gry:**
1. Co 100ms wywoływana jest funkcja `aktualizujGre()`
2. Obliczana jest nowa pozycja głowy węża
3. Sprawdzane są kolizje (ściana, własny ogon)
4. Jeśli wąż zjadł jedzenie — dodaje się punkt i losuje nowe jedzenie
5. Jeśli nie zjadł — usuwany jest ostatni segment ogona
6. Plansza jest rysowana na nowo

**Obsługa klawiszy:**
- `ArrowUp` — ruch w górę
- `ArrowDown` — ruch w dół
- `ArrowLeft` — ruch w lewo
- `ArrowRight` — ruch w prawo

**API Integration:**
```javascript
// Pobieranie wyników
fetch('/api/scores').then(r => r.json()).then(...)

// Zapisywanie wyniku
fetch('/api/scores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ player: "Jan", score: 150 })
})
```

### 5.3. Interfejs — `index.html`

**Elementy UI:**
- **Sidebar** — wyświetla aktualny wynik i listę top 10
- **Canvas** — plansza gry 500×500 pikseli
- **Overlay Start** — ekran początkowy z przyciskiem "Zacznij Grę"
- **Overlay Koniec** — ekran końcowy z inputem do wpisania imienia

## 6. Wykorzystane technologie

| Technologia | Zastosowanie |
|-------------|--------------|
| Flask | Serwer HTTP, API REST |
| HTML/CSS | Interfejs użytkownika |
| JavaScript (Vanilla) | Logika gry, obsługa zdarzeń |
| Canvas API | Renderowanie grafiki 2D |
| JSON | Przechowywanie danych |

## 7. Możliwe rozszerzenia

- Dodanie poziomów trudności (szybszy wąż)
- Funkcja pauzy
- Muzyka i efekty dźwiękowe
- Tryb dwuosobowy (węża sterowane innymi klawiszami)
- Zapis wyników do bazy danych zamiast pliku JSON

---

*Projekt wykonany jako zadanie szkolne z programowania.*
