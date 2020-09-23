"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from accounts import views as accounts_views
from generator import views as generator_views

schema_view = get_schema_view(
    openapi.Info(
        title="Lab-Template API",
        default_version="v1",
        description="",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="ddk.2000.ddk@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path("api/lessons/<int:pk>/disconnect/", generator_views.DisconnectView.as_view()),
    path(
        "api/lessons/<int:pk>/lab/",
        generator_views.DocumentView.as_view(),
        name="generator",
    ),
    path("api/lessons/update/", generator_views.UpdateFromRozkladView.as_view()),
    path("api/lessons/", generator_views.LessonListView.as_view(), name="lessons"),
    path("api/auth/", accounts_views.AuthTokenAPIView.as_view(), name="login"),
    path(
        "api/auth/register/", accounts_views.RegisterAPIView.as_view(), name="register"
    ),
    path("", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
]
