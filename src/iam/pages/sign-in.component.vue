<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h3>Welcome Back!</h3>
      <p>Continue your journey towards efficient livestock management.</p>
      <form @submit.prevent="onSignIn">
        <div class="p-fluid">
          <div class="field mt-5">
            <div class="input-group">
              <i class="pi pi-user"></i>
              <pv-float-label>
                <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username}"/>
                <label for="username">Username</label>
              </pv-float-label>
            </div>
            <small v-if="!username" class="p-invalid">Username is required</small>
          </div>
          <div class="field mt-5">
            <div class="input-group">
              <i class="pi pi-lock"></i>
              <pv-float-label>
                <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
                <label for="password">Password</label>
              </pv-float-label>
            </div>
            <small v-if="!password" class="p-invalid">Password is required</small>
          </div>
          <div class="field mt-5">
            <button type="submit" class="p-button p-button-primary">LOGIN</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthenticationStore } from "../services/authentication.store.js";
import { SignInRequest } from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);

    }
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
}

.login-container {
  background-color: #1E2A38;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
  width: 400px;
}

.field {
  width: 100%;
  margin-top: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #2E3B4E;
  border-radius: 5px;
  padding: 0.5rem;
}

.input-group i {
  color: #33d29b;
  margin-right: 0.5rem;
}

.p-button {
  width: 100%;
  background-color: #33d29b;
  color: #1E2A38;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-button:hover {
  background-color: #2bb488;
}

.p-invalid {
  color: red;
}
</style>
