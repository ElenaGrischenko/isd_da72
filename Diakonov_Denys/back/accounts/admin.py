from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token

from .forms import UserChangeForm, UserCreationForm
from .models import User


class TokenInline(admin.StackedInline):
    model = Token
    classes = ["collapse"]


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = (
        "email",
        "is_admin",
    )
    list_filter = ("is_admin",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "name",
                    "gender",
                    "password",
                    "is_admin",
                    "group_id",
                    "group_name",
                    "variant",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "name", "password", "password_confirmation"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("-id",)
    inlines = (TokenInline,)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
admin.site.unregister(Token)
