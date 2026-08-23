from fastapi.testclient import TestClient
from app.main import app
client = TestClient(app)
def test_register_user():
    response = client.post(
        "/auth/register",
        json={
            "company_name": "Test Corp",
            "username": "testuser_api",
            "email": "testuser_api@example.com",
            "password": "secret123",
            "role": "employer",
        },
    )
    assert response.status_code == 200
def test_login_user():
    response = client.post(
        "/auth/login",
        json={
            "email": "testuser_api@example.com",
            "password": "secret123",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "message" in data or "access_token" in data
def test_get_jobs():
    response = client.get("/jobs/")
    assert response.status_code == 200
    jobs = response.json()
    assert isinstance(jobs, list)
    if jobs:
        assert "title" in jobs[0]
        assert "company_name" in jobs[0]
def test_create_job():
    response = client.post(
        "/jobs/create",
        json={
            "title": "Test Engineer",
            "company_name": "Test Corp",
            "location": "Chennai",
            "salary": "6 LPA",
            "experience": "1 Year",
            "job_type": "Full Time",
            "description": "Testing job created by automated test.",
            "skills": "Python, Pytest",
        },
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Job Posted Successfully"
def test_apply_for_job():
    jobs = client.get("/jobs/").json()
    assert len(jobs) > 0
    job_id = jobs[0]["id"]
    response = client.post(
        f"/jobs/apply/{job_id}",
        json={
            "applicant_name": "Pytest Applicant",
            "email": "pytest_applicant@example.com",
            "phone": "9999999999",
        },
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Job Applied Successfully"