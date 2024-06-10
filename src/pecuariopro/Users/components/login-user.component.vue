<template>
  <div class="container">
    <div class="login-container">
      <h2 class="welcome-text">Welcome to Pecuario Pro</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="login">
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
              <button type="submit" class="btn btn-primary btn-block">Sign in</button>
            </div>
            <div class="form-group">
              <div class="checkbox-container">
                <input type="checkbox" id="remember-me">
                <label for="remember-me" class="checkbox-label">Remember Me</label>
              </div>
            </div>
            <div class="form-group">
              <p class="register-text">Don't have an account? <a href="/register">Register here</a></p>
            </div>
          </form>
          <div v-if="errorMessage" class="error-message">
            <i class="fa fa-times-circle"></i> {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserApiService } from '../services/user-api.entity.js';

export default {
  name: "LoginUser",
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const userApiService = new UserApiService();
        const response = await userApiService.getAll();
        const user = response.data.find(user => user.email === this.email);

        if (user && user.password === this.password) {
          console.log('Logged in:', user);
          localStorage.setItem('userEmail', this.email);
          this.$router.push('/home');
        } else {
          this.showErrorMessage('Invalid credentials');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.showErrorMessage('Failed to login. Please check your credentials.');
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    showErrorMessage(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
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

.form-control::placeholder {
  color: white;
  top: 48px;
}
.login-container {
  text-align: center;
}

.welcome-text {
  margin: 20px 0;
  color: white;
}

.form-control {
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 40px;
  background-color: rgba(300, 300, 300, 0.3);
  padding-left: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
  height: 40px;
  margin: 5px 0;
  background-color: #32C793 ;
  color: #37444d ;
  border: 45px;
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

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 10px 0;
}

.checkbox-label {
  margin-left: 5px;
  color: #32C793;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.register-text {
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

.error-message {
  color: red;
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.error-message i {
  margin-right: 5px;
}
</style>
