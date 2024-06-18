from django.urls import path
from rest_framework.routers import DefaultRouter

from server.views import ArticleViewSet

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
urlpatterns = router.urls
