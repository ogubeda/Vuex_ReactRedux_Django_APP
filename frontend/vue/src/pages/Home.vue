<template>
  <section>
      <h1>Home</h1>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios';


export default defineComponent({
    name: "Home",
    created: function() {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        console.log(res);
      })
    }
})
</script>

<style>
</style>
