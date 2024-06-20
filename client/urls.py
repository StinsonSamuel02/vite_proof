from django.urls import path, re_path

from .views import index

urlpatterns = [
    path("", index, name="index"),
    re_path(r'^(\d+)/$', index, name="numeric_index"),
    # Add other URL patterns as needed
    # React router aprender
]
