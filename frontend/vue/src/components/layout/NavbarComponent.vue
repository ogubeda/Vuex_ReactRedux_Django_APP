<template>
<section class = "navbar">
  <h1>Play It</h1>
  <div v-if="isAuthenticated">
    <div>{{ currentUser.username}}</div>
  <button @click="logout" class = "default_button">
            Log Out
  </button>
  </div>
</section>
</template>

<script>
import { mapGetters } from "vuex";
import { ActionsType } from "../../store/actions.type";
export default {
  name: 'NavbarComponent',
  components: {
  },
  methods: {
    logout() {
      this.$store.dispatch(ActionsType.LOGOUT).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
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
