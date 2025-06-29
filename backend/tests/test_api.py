from fastapi.testclient import TestClient
from app_api import app

client = TestClient(app)

def test_predict_valid_file():
    with open("tests/test_image.jpg", "rb") as file:
        response = client.post("/predict", files={"file": ("test_image.jpg", file, "image/jpeg")})
        print(response.json())
        assert response.status_code == 200
        assert "emotion" in response.json()


def test_predict_no_file():
    response = client.post("/predict", files={})
    print(response.json())
    assert response.status_code in (400, 422)