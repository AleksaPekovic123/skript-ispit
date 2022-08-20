<template>
  <div>
    <Header/>
    <div>
      <img class="logo" src="../../assets/logo.png" />
      <h1>Login</h1>
    </div>
    <div class="register">
      <input v-model="username" type="" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button v-on:click="handleSubmit">Login</button>
      <router-link class="routerlink" to="/signup">Don't have an account? Sign Up</router-link>
      <router-link class="guest" to="/">Continue as guest</router-link>
    </div>
  </div>
</template>

<script>
import login from '../scripts/login.js';
import Header from '../pages/Header.vue'
import { fetchAllEnt, setSelected } from '../scripts/data.js';
export default {
  name: 'Login',
  async created(){
   await fetchAllEnt('MOVIE')
   setSelected('login_header')
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  components: {
    Header
  },
  methods: {
    async handleSubmit() {
      login({
        username: this.username,
        password: this.password
      }, this.$router)
    },
  },
};
</script>

<style>
.logo {
  width: 200px;
}

.register input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid red;
}

.register .routerlink {
  width: 300px;
  height: 40px;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.register button {
  width: 320px;
  height: 40px;
  border: 1px solid ;
  background-color: rgb(255, 127, 127);
  color: white;
  cursor: pointer;
}

.register .guest{
  color: red;
}
</style>
