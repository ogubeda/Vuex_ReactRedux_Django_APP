<template>
  <div class="song_flex">
    <router-link :to="'/songs/' + song.slug" class="preview-link">
      <div class="inSong">
        <div class="inSongheader">
          <img
            src="https://i.pinimg.com/736x/e1/3e/e6/e13ee62ee59365cbfa045b79f9911f6e.jpg"
            alt="icon song"
          />
        </div>
        <div class="inSongbody">
          <div class="songTitle">{{ song.title }}</div>
          <div class="songAlbum">{{ song.album }}</div>
        </div>
      </div>
    </router-link>
    <button
      class="btn btn-sm pull-xs-right"
      @click="toggleFavorite"
      :class="{
        'btn-primary': song.favorited,
        'btn-outline-primary': !song.favorited,
      }"
    >
      <i class="ion-heart"></i>
      <span class="counter"> {{ song.favoritesCount }} </span>
    </button>
  </div>
</template>
<script lang = "ts">
import { defineComponent } from "vue";
import { ActionsType } from '../../store/actions.type';
import { mapGetters } from "vuex";

export default defineComponent({
  name: "SongsPreview",
  props: {
    song: { type: Object, required: true },
    refresh: {type: Function, required: false}
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.song.favorited ? ActionsType.FAVORITE_REMOVE : ActionsType.FAVORITE_ADD;
      this.$store.dispatch(action, this.song.slug).then(() => {
        if (this.refresh) {
          this.refresh();
        }
      });
    },
  },
});
</script>


<style>
.song_flex {
  flex: 15%;
  max-width: 150px;
}
.songTitle {
  color: white;
  font-weight: bold;
}
.songAlbum {
  color: gray;
  font-weight: italic;
}
img {
  width: 9em;
  height: 8em;
  border-radius: 5%;
}

.inSongbody {
  font-size: 15px;
  margin-left: 10px;
}
.inSongheader {
  text-align: center;
}
router-link {
  text-decoration: none;
}
</style>