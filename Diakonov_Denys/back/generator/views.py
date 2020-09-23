from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files.base import ContentFile
from rest_framework.authtoken.models import Token

from . import models, serializers
from .utils import generate_document
from generator.utils import get_lessons

# from accounts.models import User


class LessonListView(ListCreateAPIView):
    """
    Список уроков для данного пользователя + добавление новых уроков для пользователя
    """

    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.lessons.all()


class UpdateFromRozkladView(ListAPIView):

    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.lessons.all()

    def get(self, request, *args, **kwargs):
        user_obj = self.request.user
        if user_obj.group_id:
            get_lessons(user_obj)
        return self.list(request, *args, **kwargs)


class DocumentView(RetrieveAPIView):
    queryset = models.Lesson.objects.all()
    serializer_class = serializers.DocInputSerializer

    def get(self, request, *args, **kwargs):
        lesson = self.get_object()

        serializer = self.get_serializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        user = Token.objects.get(key=data["token"]).user

        file_to_send = ContentFile(
            generate_document(
                user, lesson, data["lab_name"], data["number"]
            ).getvalue(),
            name=f"lab-{data['number']}.docx",
        )
        response = HttpResponse(
            file_to_send,
            content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )
        response["Content-Length"] = file_to_send.size
        response[
            "Content-Disposition"
        ] = f'attachment; filename="lab-{data["number"]}.docx"'
        return response


class DisconnectView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.lessons.all()

    def delete(self, request, *args, **kwargs):
        lesson = self.get_object()
        lesson.students.remove(self.request.user)
        return Response("ok")
