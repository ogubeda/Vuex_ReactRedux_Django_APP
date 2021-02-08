<template>
  <section>
      <h1>Home</h1>
      <SongsList />
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios';

import SongsList from '../components/songs-list/SongsList';


export default defineComponent({
    name: "Home",
    components: {
      SongsList
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
html{
  color:white;
}
</style>
