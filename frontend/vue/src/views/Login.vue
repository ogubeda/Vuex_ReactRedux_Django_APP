<template>
  <div class="auth-page">
    <div class="container-flex">
        <div class="container">
          <h1 class="text-xs-center">Sign in</h1>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ filter(v, error) }}</li>
          </ul>
          <h3>Sign in with your Email</h3>
          <p>You will be signed in to PlayIt</p>
          <form @submit.prevent="onSubmit(email, password)">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            <p>
            <router-link class="link" :to="{ name: 'register' }">
              Need an account?
            </router-link>
            </p>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ActionsType } from "@/store/actions.type";

export default {
  name: "RwvLogin",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(ActionsType.LOGIN, { email, password })
        .then(() => this.$router.push({ name: "Home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>

<style>
.container-flex{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.form-control{
  margin: 1em
}
input{
  background-color: #373737;
  color: white;
}
button{
  background-color: black;
  border-radius: 50%;
  color: gray;
  width: 100px;
  height: 50px;
}
.link{
  color: gray;
  text-decoration: none;
}
li:hover,button:hover,
li:active{
  cursor: pointer;
}
</style>