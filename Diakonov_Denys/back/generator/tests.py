from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from accounts.models import User
from rest_framework.authtoken.models import Token
from .utils import get_lessons
from .models import Lesson
import requests


class GeneratorTestCase(APITestCase):
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

    def test_lessons_from_rozklad(self):
        user = User.objects.filter(email="test@test.com")[0]
        res = requests.get(
            f"https://api.rozklad.org.ua/v2/groups/{user.group_id}/lessons"
        )
        self.assertEqual(res.status_code, requests.codes.ok)
        number_from_api = len({obj["lesson_full_name"] for obj in res.json()["data"]})
        number_of_objects = len(get_lessons(user))
        self.assertEqual(number_from_api, number_of_objects)
        self.assertEqual(number_from_api, user.lessons.count())

    def test_generator(self):
        user = User.objects.filter(email="test@test.com")[0]
        token, created = Token.objects.get_or_create(user=user)
        url1 = reverse("lessons")
        response1 = self.client.post(
            url1,
            {"name": "Testing API"},
            format="json",
            HTTP_AUTHORIZATION=f"Token {token}",
        )
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        qs = Lesson.objects.filter(id=response1.data["id"])
        self.assertEqual(qs.count(), 1)
        lesson = qs[0]
        url2 = reverse("generator", args=[lesson.pk])
        response2 = self.client.get(url2 + f"?token={token}&lab_name=test&number=6")
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(
            response2["Content-Disposition"], 'attachment; filename="lab-6.docx"'
        )
