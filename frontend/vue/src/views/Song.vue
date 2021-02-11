<template>
<div class="song-page">
    <div class="banner">
      <div class="container">
        <h1>{{song.title}}</h1>
        <p>{{song.album}}</p>
        <p>{{song.genre}}</p>
        <p>{{song.duration}}</p>
        <p>{{song.releaseDate}}</p>
      </div>
    </div>
    <div class="container page">
    </div>
</div>
</template>
<script>
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { ActionsType } from "@/store/actions.type";

export default defineComponent({
  name: "SongRetrieve",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(ActionsType.FETCH_SONG, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["song"])
  }
});
</script>
