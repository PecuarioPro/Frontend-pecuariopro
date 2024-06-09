<template>
  <div class="container">
    <div class="register-container">
      <h2 class="register-text">Registration in Pecuario Pro</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="form-group">
              <input type="text" id="name" v-model="name" class="form-control" placeholder="Name" required>
            </div>
            <div class="form-group">
              <input type="email" id="email" v-model="email" class="form-control" placeholder="Email" required>
            </div>
            <div class="form-group">
              <div class="password-container">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="form-control" placeholder="Password" required>
                <span class="toggle-password" @click="togglePassword">
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </span>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Register</button>
            </div>
            <div class="form-group">
              <p class="login-text">¿Have you account? <router-link to="/">Log in here</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { UserApiService } from '../services/user-api.entity.js';

export default {
  name: "RegisterUser",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    async register() {
      try {
        const userApiService = new UserApiService();
        const user = await userApiService.create({ name: this.name, email: this.email, password: this.password });
        console.log('Registered user:', user);
        this.$router.push('/');
      } catch (error) {
        console.error('Error registering:', error);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* Asegura que el pseudo-elemento no se desborde */
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../../assets/pexels-francesco-ungaro-1525041.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.3;
  z-index: -1;
}

.register-container {
  text-align: center;
}

.register-text {
  margin: 20px 0;
  color: white;
}

.form-control::placeholder {
  color: white;
  top: 48px;
}

.card-body {
  padding: 20px;
}

.form-control {
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  padding-left: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
  height: 40px;
  margin: 5px 0;
  background-color: #32C793;
  color: #37444d ;
  border: none;
  border-radius: 40px;
  font-weight:500;
}

.btn-primary:hover {
  background-color: #1E845E;
  color:white;
  cursor:pointer;
}

.password-container {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-password {
  margin-left: -30px;
  cursor: pointer;
}

.login-text {
  color: #32C793;
  margin-top: 15px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>
