<template>
  <section>
      <h1>Home</h1>
      <SongsList />
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import SongsList from '../components/songs-list/SongsList';


export default defineComponent({
    name: "Home",
    components: {
      SongsList
    }
})
</script>

<style>
html{
  color:white;
}
</style>
