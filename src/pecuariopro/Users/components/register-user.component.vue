<template>
  <div class="container">
    <div class="register-container">
      <h2 class="register-text">Registro en Pecuario Pro</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="form-group">
              <input type="text" id="name" v-model="name" class="form-control" placeholder="Nombre" required>
            </div>
            <div class="form-group">
              <input type="email" id="email" v-model="email" class="form-control" placeholder="Email" required>
            </div>
            <div class="form-group">
              <div class="password-container">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="form-control" placeholder="Contraseña" required>
                <span class="toggle-password" @click="togglePassword">
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </span>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Registrar</button>
            </div>
            <div class="form-group">
              <p class="login-text">¿Ya tienes una cuenta? <router-link to="/">Inicia sesión aquí</router-link></p>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../../assets/pexels-matthew-montrone-230847-1324803.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
  color: #ffffff;
  border: none;
  border-radius: 40px;
}

.btn-primary:hover {
  background-color: #1E845E;
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
