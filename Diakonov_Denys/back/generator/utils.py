import requests
import io
from datetime import datetime
from rest_framework.exceptions import ValidationError
from .models import Lesson

from docxtpl import DocxTemplate


def get_lessons(user):
    group_id = user.group_id
    if not group_id:
        raise ValidationError({"group_id": ["Invalid group_id"]})
    res = requests.get(f"https://api.rozklad.org.ua/v2/groups/{group_id}/lessons")
    data = res.json()
    if not "data" in data:
        raise ValidationError({"group_id": ["Invalid group_id"]})
    data = {obj["lesson_full_name"] for obj in data["data"]}
    objs = [
        Lesson.objects.get_or_create(name=i)[0]
        for i in data
        if not user.lessons.filter(name=i).exists()
    ]
    user.lessons.add(*objs)
    return objs


def generate_document(user, lesson, lab_name, number):
    doc = DocxTemplate("templates/lab.docx")
    context = {
        "year": datetime.now().year,
        "name": user.name,
        "group": user.group_name,
        "variant": user.variant,
        "lesson_name": lesson.name,
        "lab_name": lab_name,
        "number": number,
        "student": "Студент" if user.gender == "m" else "Студентка",
        "made_by": "Виконав" if user.gender == "m" else "Виконала",
    }
    doc.render(context)
    file_stream = io.BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)

    return file_stream