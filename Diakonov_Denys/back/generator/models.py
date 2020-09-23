from django.db import models

from accounts.models import User


class Lesson(models.Model):
    name = models.CharField(max_length=200)
    students = models.ManyToManyField(User, related_name="lessons")

    def __str__(self):
        return self.name