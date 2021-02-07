<template>
<div class = "song_flex">
    <div class="inSong">
      <div class="inSongheader">
        <img src="https://pbs.twimg.com/profile_images/728677222794592257/u-_opbnI.jpg" alt="icon song">
      </div>
      <div class="inSongbody">
        <div class="songTitle">{{song.title}}</div>
        <div class="songAlbum">{{song.album}}</div>
      </div>
  </div>
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
  color: lightgray;
  font-weight: italic;

}
img{
  width: 9em;
  height: 8em;
  border-radius:5%;
}

.inSongbody{
  font-size: 15px;
}
.inSongheader{
  text-align: center;
}
</style>