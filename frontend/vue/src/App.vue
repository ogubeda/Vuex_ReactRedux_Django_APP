<template>
  <section class = "wrapper">
    <NavbarComponent />
    <HeaderComponent />
  </section>
</template>

<script>
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import NavbarComponent from "./components/layout/NavbarComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    NavbarComponent
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #1f1f1f;
}

.wrapper {
  display: grid;
  grid-template-areas: 
    "navbar header"
    "navbar content";
  grid-template-columns: 300px auto;
  grid-template-rows: 100px auto;
}
</style>
