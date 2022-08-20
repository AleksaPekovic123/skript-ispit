<template>
  <div>
    <div>
      <img class="logo" src="../../assets/logo.png" />
      <h1>Sign Up</h1>
    </div>
    <div class="register">
      <input id= "email-field" v-model="email" type="" placeholder="Email" />
      <input id= "username-field" v-model="username" type="" placeholder="Username" />
      <input id= "password-field" v-model="password" type="password" placeholder="Password" />
      <button v-on:click="handleSubmit">Sign Up</button>
      <router-link class="routerlink" to="/login">Already have an account? Login</router-link>
    </div>
  </div>
</template>

<script>
import signUp from '../scripts/signUp.js';
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      console.log(document.getElementById('email-field').value)
      console.log(document.getElementById('password-field').value)
      signUp({
        email: document.getElementById('email-field').value,
        username: document.getElementById('username-field').value,
        password: document.getElementById('password-field').value
      }, this.$router)
    },
  },
};
</script>

<style>
.logo {
  width: 200px;
}

.register input{
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid skyblue;
}

.register .routerlink{
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
  border: 1px solid skyblue;
  background-color: skyblue;
  color: white;
  cursor: pointer;
}
</style>
