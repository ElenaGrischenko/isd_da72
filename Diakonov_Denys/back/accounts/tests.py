from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from .models import User


class UserTestCase(APITestCase):
    def setUp(self):
        user = User.objects.create(
            email="test@test.com",
            name="Test U.S.",
            group_id=5156,
            group_name="ДА-72",
            gender="m",
            variant=5,
        )
        user.set_password("reAllySafePas5w0rd")
        user.save()

    def test_created_user(self):
        qs = User.objects.filter(email="test@test.com")
        self.assertEqual(qs.count(), 1)

    def test_register_user_api(self):
        url = reverse("register")
        data = {
            "email": "test_api@test.com",
            "name": "Test A.P.I.",
            "group_id": 5156,
            "group_name": "ДА-72",
            "gender": "m",
            "variant": 8,
            "password": "reAllySafePas5w0rd",
            "password2": "reAllySafePas5w0rd",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        qs = User.objects.filter(id=response.data["id"])
        self.assertEqual(qs.count(), 1)

    def test_register_user_api_fail(self):
        url = reverse("register")
        data = {
            "email": "test_api@test.com",
            "name": "Test A.P.I.",
            "password": "reAllySafePas5w0rd",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user_api(self):
        url = reverse("login")
        data = {
            "username": "test@test.com",
            "password": "reAllySafePas5w0rd",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data.get("token")), 0)

    def test_login_user_api_fail(self):
        url = reverse("login")
        data = {
            "username": "test@test.com",
            "password": "qwerty123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["non_field_errors"][0].code, "authorization")
