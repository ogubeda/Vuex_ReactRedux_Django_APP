<template>
  <div class="songList">
    <SongsPreview v-for="(song, index) in songs" :song="song" :refresh = "refresh" :key="song.title + index" />
  </div>
</template>

<script>
import SongsPreview from "./SongsPreview";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { ActionsType } from "../../store/actions.type";

export default defineComponent({
  name: "SongsList",
  components: {
    SongsPreview,
  },
  mounted() {
    this.$store.dispatch(ActionsType.FETCH_SONGS);
  },
  computed: {
    ...mapGetters(["songs"])
  },
  methods: {
    refresh() {
      this.$store.dispatch(ActionsType.FETCH_SONGS)
    }
  },
});
</script>

<style>
.songList {
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
}
</style>