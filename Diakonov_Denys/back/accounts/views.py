from rest_framework.generics import CreateAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from .serializers import UserRegisterSerializer


class RegisterAPIView(CreateAPIView):
    """
    Регистрация (создание нового пользователя)
    """

    serializer_class = UserRegisterSerializer


class AuthTokenAPIView(ObtainAuthToken):
    """
    Получить токен авторизации
    """

    renderer_classes = (JSONRenderer, BrowsableAPIRenderer)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "name": user.name, "email": user.email})
