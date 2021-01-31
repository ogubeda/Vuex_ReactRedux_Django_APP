from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import (
    SongViewSet, SongsFavoriteAPIView, SongsFeedAPIView,
    CommentsListCreateAPIView, CommentsDestroyAPIView, TagListAPIView
)

app_name = 'songs'

router = DefaultRouter(trailing_slash=False)
router.register(r'songs', SongViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),

    url(r'^tags/?$', TagListAPIView.as_view()),
]
