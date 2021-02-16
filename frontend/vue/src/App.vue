<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Sign in</router-link>

    </div>
    <section class="wrapper">
      <NavbarComponent />
      <HeaderComponent />
      <div class="content"></div>
      <RouterView />
    </section>
  </div>
</template>

<script>
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import NavbarComponent from "./components/layout/NavbarComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderComponent,
    NavbarComponent,
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
body {
  margin: 0;
  padding: 0;
  background: #1f1f1f;
  font-family: "Nanum Gothic";
}

.wrapper {
  display: grid;
  grid-template-areas:
    "navbar header"
    "navbar content";
  grid-template-columns: 300px auto;
  grid-template-rows: 100px auto;
}

.content {
  grid-area: "content";
}
</style>
