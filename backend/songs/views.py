from rest_framework import generics, mixins, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Song
from .serializers import SongSerializer

class SongViewSet(mixins.CreateModelMixin, 
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     generics.DestroyAPIView,
                     viewsets.GenericViewSet):

    lookup_field = 'slug'
    permission_classes = (AllowAny,)
    serializer_class = SongSerializer
    queryset = Song.objects.all()


    def get_queryset(self):
        queryset = self.queryset

        favorited_by = self.request.query_params.get('favorited', None)
        if favorited_by is not None:
            queryset = queryset.filter(
                favorited_by__user__username=favorited_by
            )
            
        return queryset

    
    def create(self, request):
        serializer_context = {
            'request': request
        }
        serializer_data = request.data.get('song', {})

        serializer = self.serializer_class(
        data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        serializer_context = {'request': request}
        serializer_data = self.get_queryset()
        # serializer = self.serializer_class(
        #     serializer_data, many=True)
        
        serializer = self.serializer_class(
            serializer_data,
            context=serializer_context,
            many = True
        )

        return Response({
            'songs': serializer.data
        }, status=status.HTTP_200_OK)

        # return self.serializer

    def retrieve(self, request, slug):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Song.DoesNotExist:
            raise NotFound('A song with this slug does not exist.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


    def update(self, request, slug):
        serializer_context = {'request': request}
        print('*********** serializer.data ************')
        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Song.DoesNotExist:
            raise NotFound('A song with this slug does not exist.')
            
        serializer_data = request.data.get('song', {})

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class SongsFavoriteAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = SongSerializer

    def delete(self, request, song_slug=None):
        profile = self.request.user.profile
        serializer_context = {'request': request}

        try:
            song = Song.objects.get(slug=song_slug)
        except Song.DoesNotExist:
            raise NotFound('A Song with this slug was not found.')

        profile.unfavorite(song)

        serializer = self.serializer_class(song, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, song_slug=None):
        profile = self.request.user.profile
        serializer_context = {'request': request}

        try:
            song = Song.objects.get(slug=song_slug)
        except Song.DoesNotExist:
            raise NotFound('A Song with this slug was not found.')

        profile.favorite(song)

        serializer = self.serializer_class(song, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_201_CREATED)



