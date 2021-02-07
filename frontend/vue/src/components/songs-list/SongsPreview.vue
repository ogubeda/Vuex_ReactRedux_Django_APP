<template>
<div>
  <h2>Songs Preview</h2>
  <p v-for = "(song, index) in songs" :name = "song.title" :key="index">{{song.title}}</p>
  </div>
</template>

<script lang = "ts">

import { defineComponent, ref } from 'vue';
import { Song } from '../../models/Song';
import { mapGetters } from "vuex";


import { ActionsType } from "../../store/actions.type";

export default defineComponent({
    name: "SongsPreview",
    mounted() {
      this.$store.dispatch(ActionsType.FETCH_SONGS)
    },
    computed: {
      ...mapGetters(["songs"]),
    }
});
</script>