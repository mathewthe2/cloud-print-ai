import pytest
from src import database

# Mock Database Singleton connection
@pytest.fixture(autouse=True)
def mock_db(monkeypatch):
    def mock(*args, **kwargs):
        pass
    monkeypatch.setattr(database.Database, '__init__', mock)
    monkeypatch.setattr(database.Database, 'to_dict', mock)