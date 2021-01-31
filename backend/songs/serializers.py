from rest_framework import serializers

from conduit.apps.profiles.serializers import ProfileSerializer

from .models import Song, Tag
from .relations import TagRelatedField


class SongSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    slug = serializers.SlugField(required=False)

    tagList = TagRelatedField(many=True, required=False, source='tags')

    # Django REST Framework makes it possible to create a read-only field that
    # gets it's value by calling a function. In this case, the client expects
    # `created_at` to be called `createdAt` and `updated_at` to be `updatedAt`.
    # `serializers.SerializerMethodField` is a good way to avoid having the
    # requirements of the client leak into our API.
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model = Song
        fields = (
            'title',
            'release_date',
            'genre',
            'duration',
            'album',
            'slug',
            'tagList',
            'createdAt',
            'updatedAt',
        )

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])

        for tag in tags:
            song.tags.add(tag)

        return article

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tag',)

    def to_representation(self, obj):
        return obj.tag
