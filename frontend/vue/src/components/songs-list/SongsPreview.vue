<template>
  <div class= "song_flex">
    <router-link :to="'/songs/'+ song.slug" class="preview-link"> 
      <div class="inSong">
        <div class="inSongheader">
          <img src="https://i.pinimg.com/736x/e1/3e/e6/e13ee62ee59365cbfa045b79f9911f6e.jpg" alt="icon song">
        </div>
        <div class="inSongbody">
          <div class="songTitle">{{song.title}}</div>
          <div class="songAlbum">{{song.album}}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang = "ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: "SongsPreview",
    props: {
      song: { type: Object, required: true }
    }
  
});
</script>


<style>
.song_flex {
  flex: 15%;
  max-width: 150px;
}
.songTitle{
  color: white;
  font-weight: bold;
}
.songAlbum{
  color: gray;
  font-weight: italic;
}
img{
  width: 9em;
  height: 8em;
  border-radius:5%;
}

.inSongbody{
  font-size: 15px;
  margin-left: 10px;
}
.inSongheader{
  text-align: center;
}
router-link {
    text-decoration: none;
}
</style>