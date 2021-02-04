<template>
  <section>
      <h1>Home</h1>
      <SongsPreview />
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios';

import SongsPreview from '../components/songs-list/SongsPreview';


export default defineComponent({
    name: "Home",
    components: {
      SongsPreview
    },
    created: function() {
      axios.get('http://localhost:8000/api/songs')
      .then(res => {
        console.log(res);
      })
    }
})
</script>

<style>
</style>
