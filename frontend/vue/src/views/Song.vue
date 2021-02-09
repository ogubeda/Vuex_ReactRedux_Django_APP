<template>
<div class="song-page">
    <div class="banner">
      <div class="container">
        <h1>{{song.title}}</h1>
      </div>
    </div>
    <div class="container page">
    </div>
</div>
</template>
<script>
      console.log("dfssssssssssss")
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { ActionsType } from "@/store/actions.type";
import { FETCH_SONG } from "@/store/actions.type";

export default defineComponent({
  name: "SongRetrieve ",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_SONG, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  mounted() {
    this.$store.dispatch(ActionsType.FETCH_SONG);
  },
  computed: {
    ...mapGetters(["song"]),
  },
});
</script>
