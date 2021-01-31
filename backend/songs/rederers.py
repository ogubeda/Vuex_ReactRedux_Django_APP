from core.renderers import ConduitJSONRenderer


class SongJSONRenderer(ConduitJSONRenderer):
    object_label = 'song'
    pagination_object_label = 'songs'
    pagination_count_label = 'songsCount'
