import json
import os


class TestGetScores:
    def test_get_scores_empty(self, client, temp_scores_file):
        response = client.get('/api/scores')
        assert response.status_code == 200
        data = response.get_json()
        assert data == []

    def test_get_scores_sorted(self, client, temp_scores_file):
        scores = [
            {"player": "Alice", "score": 50},
            {"player": "Bob", "score": 150},
            {"player": "Charlie", "score": 100}
        ]
        with open(temp_scores_file, 'w') as f:
            json.dump(scores, f)
        
        response = client.get('/api/scores')
        assert response.status_code == 200
        data = response.get_json()
        
        scores_returned = [s['score'] for s in data]
        assert scores_returned == sorted(scores_returned, reverse=True)

    def test_get_scores_limit_10(self, client, temp_scores_file):
        scores = [{"player": f"Player{i}", "score": i * 10} for i in range(15)]
        with open(temp_scores_file, 'w') as f:
            json.dump(scores, f)
        
        response = client.get('/api/scores')
        assert response.status_code == 200
        data = response.get_json()
        
        assert len(data) == 10


class TestPostScores:
    def test_post_score_valid(self, client, temp_scores_file):
        response = client.post('/api/scores', json={
            "player": "TestPlayer",
            "score": 100
        })
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'ok'
        
        with open(temp_scores_file, 'r') as f:
            saved = json.load(f)
        assert len(saved) == 1
        assert saved[0]['player'] == 'TestPlayer'
        assert saved[0]['score'] == 100

    def test_post_score_missing_player(self, client, temp_scores_file):
        response = client.post('/api/scores', json={"score": 100})
        assert response.status_code == 400

    def test_post_score_missing_score(self, client, temp_scores_file):
        response = client.post('/api/scores', json={"player": "Test"})
        assert response.status_code == 400


class TestScorePersistence:
    def test_scores_persist(self, client, temp_scores_file):
        client.post('/api/scores', json={"player": "Persist", "score": 200})
        
        response = client.get('/api/scores')
        data = response.get_json()
        assert len(data) == 1
        assert data[0]['player'] == 'Persist'
        assert data[0]['score'] == 200
