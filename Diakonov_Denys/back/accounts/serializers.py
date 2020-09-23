from rest_framework import serializers

from .models import User

from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

from generator.utils import get_lessons


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"})

    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "gender",
            "group_id",
            "group_name",
            "variant",
            "password",
            "password2",
            "token",
        ]
        read_only_fields = ["id", "token"]

    def validate_email(self, value):
        queryset = User.objects.filter(email__iexact=value)
        if queryset.exists():
            raise serializers.ValidationError(
                {"email": ["User with this email already exists"]}
            )
        else:
            return value

    def validate(self, data):
        errors = dict()
        pw = data.get("password")
        if not pw is None:
            pw2 = data.pop("password2")
            if pw != pw2:
                errors["password"] = ["Passwords must match"]
        if errors:
            raise serializers.ValidationError(errors)
        return data

    def password_validation(self, user_obj, password):
        errors = dict()
        try:
            validate_password(password, user_obj)
        except exceptions.ValidationError as err:
            errors["password"] = list(err.messages)
        if errors:
            raise serializers.ValidationError(errors)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user_obj = User(**validated_data)
        self.password_validation(user_obj, password)
        user_obj.set_password(password)
        user_obj.save()
        if user_obj.group_id:
            get_lessons(user_obj)
        return user_obj

    def get_token(self, object):
        token, created = Token.objects.get_or_create(user=object)
        return token.key
