import hashlib
from datetime import timedelta, datetime
from string import digits

from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string

__all__ = [
    "User",
]


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **kwargs):
        if not email:
            raise ValueError("User must have Email")

        user = self.model(
            # username=username,
            email=email,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email,
        password,
    ):
        user = self.create_user(email=email, password=password, name="admin")
        user.is_admin = True
        user.save(using=self._db)
        return user


GENDERS = [("m", "Male"), ("f", "Female")]


class User(AbstractBaseUser):
    email = models.EmailField(unique=True, verbose_name="Email")
    name = models.CharField(max_length=50)

    group_id = models.IntegerField(blank=True, null=True)
    variant = models.IntegerField(blank=True, null=True)
    group_name = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDERS, default="m")

    is_admin = models.BooleanField(default=False, verbose_name="Admin")
    registered = models.DateTimeField(auto_now_add=True, verbose_name="Registered")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
