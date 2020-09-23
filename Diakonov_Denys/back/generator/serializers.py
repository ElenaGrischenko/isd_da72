from rest_framework import serializers

from . import models
from rest_framework.authtoken.models import Token


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ["id", "name"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        obj = models.Lesson.objects.get_or_create(**validated_data)[0]
        obj.students.add(self.context["request"].user)
        return obj


class DocInputSerializer(serializers.Serializer):
    number = serializers.IntegerField(required=True)
    lab_name = serializers.CharField(required=True)
    token = serializers.CharField(required=True)

    def validate(self, attrs):
        try:
            token = Token.objects.get(key=attrs["token"])
        except:
            raise serializers.ValidationError({"token": ["Invalid token"]})
        return super().validate(attrs)