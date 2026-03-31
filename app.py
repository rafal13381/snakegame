from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

SCORES_FILE = os.environ.get('SCORES_FILE', 'scores.json')

def czytaj_wyniki():
    if not os.path.exists(SCORES_FILE):
        return []
    
    with open(SCORES_FILE, 'r') as plik:
        return json.load(plik)

def zapisz_wyniki(wyniki):
    with open(SCORES_FILE, 'w') as plik:
        json.dump(wyniki, plik)

# Glowna strona z gra
@app.route('/')
def start():
    return render_template('index.html')

# API - Odczyt wynikow
@app.route('/api/scores', methods=['GET'])
def pobierz_wyniki():
    wyniki = czytaj_wyniki()
    
    # Sortowanie tablicy po wyniku (od najwiekszego)
    def wez_wynik(element):
        return element.get('score', 0)
        
    wyniki.sort(key=wez_wynik, reverse=True)
    
    # Zwracamy tylko najlepsze 10
    return jsonify(wyniki[:10])

# API - Zapisywanie nowego wyniku z js
@app.route('/api/scores', methods=['POST'])
def dodaj_wynik():
    dane = request.json
    
    if not dane or 'player' not in dane or 'score' not in dane:
        return jsonify({"error": "Missing player or score"}), 400
    
    wyniki = czytaj_wyniki()
    
    nowy_wynik = {
        "player": dane['player'],
        "score": dane['score']
    }
    
    wyniki.append(nowy_wynik)
    zapisz_wyniki(wyniki)
    
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True)
