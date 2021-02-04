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
        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)
        
        print('*********** serializer.data ************')
        print(serializer.data)
        return Response({
            'songs': serializer.data
        }, status=status.HTTP_200_OK)

        return self.serializer

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





