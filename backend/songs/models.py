from django.db import models

from core.models import TimestampedModel


class Song(TimestampedModel):
    slug = models.SlugField(max_length=100,unique=True)
    title = models.CharField(max_length=500)
    releaseDate = models.IntegerField()
    genre = models.CharField( max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True,db_index=True)
    duration = models.IntegerField()
    album = models.CharField( max_length=255)

    def __unicode__(self):
        return self.title