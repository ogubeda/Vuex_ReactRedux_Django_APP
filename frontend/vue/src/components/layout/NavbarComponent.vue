<template>
<section class = "navbar">
  <h1>Play It</h1>
</section>
</template>

<script>

export default {
  name: 'NavbarComponent',
  components: {
  },
  setup() {
    console.log('test');
  }
}
</script>

<style>
.navbar {
  height: 100vh;
  background: #252525;
  grid-area: "navbar";
}
</style>
