from django.urls import path
from rest_framework.routers import DefaultRouter

from server import views
from server.views import ArticleViewSet, AccountViewSet

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('accounts', AccountViewSet, basename='accounts')
urlpatterns = router.urls
