<template>
  <div class="auth-page">
    <div class="container-flex">
          <h1 class="text-xs-center">Sign up</h1>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ filter(v, error) }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <div class="inputs">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
              />
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
            </div>
            <p>
            <router-link class="link" :to="{ name: 'login' }">
              Have an account?
            </router-link>
            </p>
            <button class="btn btn-lg btn-primary pull-xs-right default_button">
              Sign up
            </button>
          </form>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { ActionsType } from "@/store/actions.type";

export default {
  name: "RwvRegister",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(ActionsType.REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => this.$router.push({ name: "Home" }));
    }
  }
};
</script>


<style>
.form-control{
  margin-right: 4em;
}
.inputs{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.container-flex{
   display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
}

input{
  background-color: #373737;
  color: white;
  margin: 1em;
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