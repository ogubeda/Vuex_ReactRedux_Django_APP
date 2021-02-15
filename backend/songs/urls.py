from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import SongViewSet, SongsFavoriteAPIView

app_name = 'songs'

router = DefaultRouter(trailing_slash=False)
router.register(r'songs', SongViewSet, basename='songs')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^songs/(?P<song_slug>[-\w]+)/favorite/?$',
        SongsFavoriteAPIView.as_view()),
]
