// --- Konfiguracja Gry ---
const plotno = document.getElementById('plansza');
const rysowanie = plotno.getContext('2d');

const rozmiarKratki = 25;
const pole = 20; // Plansza 500 / 25 = 20 kratek

let waz = [];
let jedzenie = {};
let predkoscX = 0;
let predkoscY = 0;
let punkty = 0;
let petlaGry;

// Znajdowanie elementów na stronie
const napisWynik = document.getElementById('aktualnyWynik');
const ekranStart = document.getElementById('ekranStart');
const ekranKoniec = document.getElementById('ekranKoniec');
const listaWynikow = document.getElementById('listaWynikow');
const inputGracza = document.getElementById('nazwaGracza');

function losujJedzenie() {
    return {
        x: Math.floor(Math.random() * pole),
        y: Math.floor(Math.random() * pole)
    };
}

// --- Główna Logika ---
function rozpocznijGre() {
    // Wąż zaczyna z jednym elementem na środku (10, 10)
    waz = [
        { x: 10, y: 10 }
    ];
    jedzenie = losujJedzenie();
    predkoscX = 0;
    predkoscY = 0;
    punkty = 0;

    napisWynik.innerText = punkty;

    // Ukrywanie nakładek
    ekranStart.classList.remove('active');
    ekranKoniec.classList.remove('active');

    // Zatrzymujemy poprzednią grę (jesli jakas byla) i wlaczamy co 100 ms ramke
    clearInterval(petlaGry);
    petlaGry = setInterval(aktualizujGre, 100);
}

function koniecGry() {
    clearInterval(petlaGry);
    document.getElementById('wynikKoncowy').innerText = punkty;
    ekranKoniec.classList.add('active'); // Pokazanie ekranu Game Over
}

function rysujPlansze() {
    // 1. Zamalowanie tła na czarno
    rysowanie.fillStyle = 'black';
    rysowanie.fillRect(0, 0, plotno.width, plotno.height);

    // 2. Rysowanie węża element po elemencie pętlą for
    for (let i = 0; i < waz.length; i++) {
        if (i === 0) {
            rysowanie.fillStyle = 'green'; // głowa zielona
        } else {
            rysowanie.fillStyle = 'lightgreen'; // ogon jasnozielony
        }
        rysowanie.fillRect(waz[i].x * rozmiarKratki, waz[i].y * rozmiarKratki, rozmiarKratki - 1, rozmiarKratki - 1);
    }

    // 3. Rysowanie jedzenia
    rysowanie.fillStyle = 'red';
    rysowanie.fillRect(jedzenie.x * rozmiarKratki, jedzenie.y * rozmiarKratki, rozmiarKratki - 1, rozmiarKratki - 1);
}

function aktualizujGre() {
    // Jeżeli wąż stoi w miejscu (po resecie na start) to nic nie rób
    if (predkoscX === 0 && predkoscY === 0) {
        rysujPlansze();
        return;
    }

    // Gdzie teraz chcemy przesunąć głowę węża?
    const nowaGlowa = {
        x: waz[0].x + predkoscX,
        y: waz[0].y + predkoscY
    };

    // Sprawdzanie kolizji ze ścianą planszy
    if (nowaGlowa.x < 0 || nowaGlowa.x >= pole || nowaGlowa.y < 0 || nowaGlowa.y >= pole) {
        koniecGry();
        return;
    }

    // Sprawdzanie kolizji z własnym ogonem (pętla)
    for (let i = 0; i < waz.length; i++) {
        if (waz[i].x === nowaGlowa.x && waz[i].y === nowaGlowa.y) {
            koniecGry();
            return;
        }
    }

    // Faktyczne dodanie nowej komórki (głowy) na początek węża
    waz.unshift(nowaGlowa);

    // Jesli głowa zderza się z jedzeniem
    if (nowaGlowa.x === jedzenie.x && nowaGlowa.y === jedzenie.y) {
        punkty += 10;
        napisWynik.innerText = punkty;
        jedzenie = losujJedzenie(); // wylosuj gdzies indziej jedzenie
    } else {
        // Usuwamy ostatnią kratkę ogona z węża jeśli w tej rundzie niczego nie zjedzono
        waz.pop();
    }

    rysujPlansze();
}

// --- Obsługa Klawiszy (If i Else) ---
window.addEventListener('keydown', function (zdarzenie) {
    if (zdarzenie.key === 'ArrowUp' && predkoscY !== 1) {
        predkoscX = 0;
        predkoscY = -1;
        zdarzenie.preventDefault(); // nie przewijaj strony strzalkami
    }
    else if (zdarzenie.key === 'ArrowDown' && predkoscY !== -1) {
        predkoscX = 0;
        predkoscY = 1;
        zdarzenie.preventDefault();
    }
    else if (zdarzenie.key === 'ArrowLeft' && predkoscX !== 1) {
        predkoscX = -1;
        predkoscY = 0;
        zdarzenie.preventDefault();
    }
    else if (zdarzenie.key === 'ArrowRight' && predkoscX !== -1) {
        predkoscX = 1;
        predkoscY = 0;
        zdarzenie.preventDefault();
    }
});

// --- Integracja API (Prosty fetch) ---

function pobierzWyniki() {
    fetch('/api/scores')
        .then(function (odpowiedz) {
            return odpowiedz.json(); // Pobieramy z internetu (flaska) plik na JSON
        })
        .then(function (dane) {
            listaWynikow.innerHTML = '';

            // Jesli nie ma danch to powiadom 
            if (dane.length === 0) {
                listaWynikow.innerHTML = '<li>Brak wyników</li>';
                return;
            }

            // Normalna pętla dorzucająca rekordy do listy HTML ze znacznikami li
            for (let i = 0; i < dane.length; i++) {
                const gracz = dane[i];
                const wyswietlanyTekst = '<li>' + gracz.player + ' - ' + gracz.score + ' pkt</li>';
                listaWynikow.innerHTML += wyswietlanyTekst;
            }
        });
}

function zapiszWynik() {
    const imie = inputGracza.value;

    if (imie === "") {
        alert("Podaj imię gracza zanim wyślesz wynik!");
        return;
    }

    // Slownik, taki sam jak ten uzywany we Flasku w Python
    const obiektZdanymi = {
        player: imie,
        score: punkty
    };

    fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obiektZdanymi) // Pakujemy nasz slownik js do paczki i wysylamy do FLaska
    }).then(function () {
        // Gdy serwer zapisze - wroc do glownego ekranu domyslnego "Gotowy?"
        ekranKoniec.classList.remove('active');
        ekranStart.classList.add('active');
        pobierzWyniki(); // Przeładuj zaktualizowane wyniki na pasku High Scores.
    });
}

// Przy załadowaniu strony narysuj pustą planszę i ściągnij wyniki.
rysujPlansze();
pobierzWyniki();
