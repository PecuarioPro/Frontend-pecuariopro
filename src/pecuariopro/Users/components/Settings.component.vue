<template>
  <div>
    <h2>Settings</h2>
    <form @submit.prevent="updateUser">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="user.name" type="text" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="user.email" type="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="user.password" type="password" required>
      </div>
      <button type="submit">Update</button>
    </form>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { UserApiService } from '../services/user-api.entity.js';

export default {
  name: "Settings.component",
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async updateUser() {
      try {
        const userApiService = new UserApiService();
        const updatedUser = await userApiService.updateUser(this.user);
        console.log('Updated user:', updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    logout() {
      // Aquí puedes agregar la lógica para cerrar la sesión
      console.log('Logout');
    },
  },
};
</script>