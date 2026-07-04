from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_issue():
    response = client.post(    
        "/issues/",
        json={
            "title": "First issue",
            "description": "Testing",
            "priority": "high"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "First issue"
    assert data["status"] == "open"
    assert "id" in data
    assert data["date_completed"] is None


def test_read_issues():
    response = client.get("/issues/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_read_issue():
    issues = client.get("/issues/").json()
    issue_id = issues[0]["id"]
    response = client.get(f"/issues/{issue_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == issue_id


def test_update_issue():
    issues = client.get("/issues/").json()
    issue_id = issues[0]["id"]
    response = client.put(
        f"/issues/{issue_id}",
        json={
            "title": "Updated title",
            "description": "Updated description",
            "priority": "medium",
            "status": "closed",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated title"
    assert data["status"] == "closed"
    assert data["priority"] == "medium"
    assert data["date_completed"] is not None


def test_delete_issue():
    issues = client.get("/issues/").json()
    issue_id = issues[0]["id"]
    response = client.delete(f"/issues/{issue_id}")
    assert response.status_code == 200
    deleted = response.json()
    assert deleted["id"] == issue_id
