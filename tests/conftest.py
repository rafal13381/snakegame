import pytest
import sys
import os
import json
import tempfile

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@pytest.fixture
def temp_scores_file():
    fd, path = tempfile.mkstemp(suffix='.json')
    with os.fdopen(fd, 'w') as f:
        json.dump([], f)
    
    original_path = os.path.join(os.path.dirname(__file__), '..', 'scores.json')
    original_backup = original_path + '.backup'
    
    if os.path.exists(original_path):
        with open(original_path, 'r') as src:
            with open(original_backup, 'w') as dst:
                dst.write(src.read())
        os.remove(original_path)
    
    yield path
    
    if os.path.exists(original_backup):
        with open(original_backup, 'r') as src:
            with open(original_path, 'w') as dst:
                dst.write(src.read())
        os.remove(original_backup)


@pytest.fixture
def client(temp_scores_file):
    import importlib
    import app as app_module
    
    app_module.SCORES_FILE = temp_scores_file
    
    app_module.app.config['TESTING'] = True
    with app_module.app.test_client() as client:
        yield client
