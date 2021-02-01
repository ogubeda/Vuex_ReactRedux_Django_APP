from rest_framework import serializers


from .models import Song


class SongSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False)

    # tagList = TagRelatedField(many=True, required=False, source='tags')

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
            'updatedAt',
            'slug',
            'title',
            'releaseDate',
            'genre',
            'createdAt',
            'duration',
            'album'
        )



    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

