import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework import viewsets
from rest_framework.decorators import action

from server.models import Article
from server.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class AccountViewSet(viewsets.ViewSet):
    @require_POST
    @action(detail=False, methods=['post'])
    def login(self, request):
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        if username is None or password is None:
            return JsonResponse({"detail": "Please provide username and password"})

        user = authenticate(username=username, password=password)

        if user is None:
            return JsonResponse({"detail": "Invalid credentials"}, status=400)

        login(request, user)
        return JsonResponse({"detail": "Successfully logged in"})

    @require_POST
    @action(detail=False, methods=['post'])
    def register(self, request):
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return JsonResponse({"detail": "Please provide both username and password"}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"detail": "Username already exists"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return JsonResponse({"detail": "Successfully registered user"})

    @require_POST
    @action(detail=False, methods=['post'])
    def logout(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"detail": "User is not logged in"}, status=400)
        logout(request)
        return JsonResponse({"detail": "Successfully logged out"})

    @action(detail=False, methods=['get'])
    def session(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"isAuthenticated": False})
        return JsonResponse({"isAuthenticated": True})

    @action(detail=False, methods=['get'])
    def whoami(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"isAuthenticated": False})
        return JsonResponse({"username": request.user.username})
