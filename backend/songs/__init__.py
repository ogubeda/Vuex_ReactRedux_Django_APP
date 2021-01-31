from django.songs import AppConfig


class SongsAppConfig(AppConfig):
    name = 'songs'
    label = 'songs'
    verbose_name = 'Songs'

    def ready(self):
        import songs.signals

default_app_config = 'songs.SongsAppConfig'
