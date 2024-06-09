<template>
  <div class="settings-container">
    <div class="settings-header">
      <i class="pi pi-cog settings-icon"></i>
      <h2>Settings</h2>
    </div>
    <form @submit.prevent="updateUser">
      <div class="p-grid">
        <!-- Primera fila -->
        <div class="p-col-4">
          <div class="p-field">
            <label for="name">Name:</label>
            <div class="p-inputgroup">
              <div v-if="!editName" class="input-text">{{ user.name }}</div>
              <input v-else id="name" v-model="user.name" type="text" class="p-inputtext p-component" required>
              <button type="button" @click="toggleEdit('name')" class="p-button p-button-outlined p-button-text">
                <div class="p-button-icon">
                  <i :class="editName ? 'pi pi-check' : 'pi pi-pencil'"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="p-col-4">
          <div class="p-field">
            <label for="email">Email:</label>
            <div class="p-inputgroup">
              <div v-if="!editEmail" class="input-text">{{ user.email }}</div>
              <input v-else id="email" v-model="user.email" type="email" class="p-inputtext p-component" required>
              <button type="button" @click="toggleEdit('email')" class="p-button p-button-outlined p-button-text">
                <div class="p-button-icon">
                  <i :class="editEmail ? 'pi pi-check' : 'pi pi-pencil'"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="p-col-4">
          <div class="p-field">
            <label for="password">Password:</label>
            <div class="p-inputgroup">
              <div v-if="!editPassword" class="input-text">{{ user.password }}</div>
              <input v-else id="password" v-model="user.password" type="password" class="p-inputtext p-component" required>
              <button type="button" @click="toggleEdit('password')" class="p-button p-button-outlined p-button-text">
                <div class="p-button-icon">
                  <i :class="editPassword ? 'pi pi-check' : 'pi pi-pencil'"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- Segunda fila para los botones -->
        <div class="p-col-12">
          <div class="p-grid p-justify-center">
            <div class="p-col-3">
              <button type="submit" class="p-button p-component p-button-primary">Update</button>
            </div>
            <div class="p-col-3">
              <button @click="logout" class="p-button p-component p-button-secondary">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showUpdateMessage" class="p-field" style="margin-top: 1rem;">
        <small style="color: #ff7043;">Press Update button to apply changes.</small>
      </div>
      <ConfirmDialog></ConfirmDialog>
    </form>
  </div>
</template>

<script>
import { UserApiService } from '../services/user-api.entity.js';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  name: "SettingsComponent",
  components: {
    ConfirmDialog
  },
  data() {
    return {
      displayConfirmation: false,
      user: {
        id: null,
        name: '',
        email: '',
        password: '',
      },
      editName: false,
      editEmail: false,
      editPassword: false,
      showUpdateMessage: false
    };
  },
  async created() {
    try {
      const userApiService = new UserApiService();
      const currentUserEmail = localStorage.getItem('userEmail');

      if (!currentUserEmail) {
        throw new Error('User email not found');
      }

      const response = await userApiService.getAll();
      const user = response.data.find(user => user.email === currentUserEmail);

      if (user) {
        this.user.id = user.id;
        this.user.name = user.name;
        this.user.email = user.email;
        this.user.password = user.password;
        localStorage.setItem('userName', this.user.name);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  methods: {
    toggleEdit(field) {
      if (field === 'name') {
        this.editName = !this.editName;
      } else if (field === 'email') {
        this.editEmail = !this.editEmail;
      } else if (field === 'password') {
        this.editPassword = !this.editPassword;
      }

      if (this.editName || this.editEmail || this.editPassword) {
        this.displayConfirmation = true;
        this.showUpdateMessage = true;
      } else {
        this.showUpdateMessage = false;
      }
    },
    confirmEdit() {
      console.log('Confirmed changes');
      this.showUpdateMessage = true;
      localStorage.setItem('userName', this.user.name);
      this.displayConfirmation = false;
    },
    async updateUser() {
      try {
        const userApiService = new UserApiService();
        const updatedUser = await userApiService.update(this.user.id, this.user);
        console.log('Updated user:', updatedUser);
        this.showUpdateMessage = false;
        // Guardar el nombre de usuario en localStorage
        localStorage.setItem('userName', this.user.name);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    logout() {
      console.log('Logout');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      this.$router.push('/login');
    },
    cancelEdit() {
      this.editName = false;
      this.editEmail = false;
      this.editPassword = false;
      this.showUpdateMessage = false;
      this.fetchUserData();
      this.displayConfirmation = false;
    },
    async fetchUserData() {
      try {
        const userApiService = new UserApiService();
        const currentUserEmail = localStorage.getItem('userEmail');

        if (!currentUserEmail) {
          throw new Error('User email not found');
        }

        const response = await userApiService.getAll();
        const user = response.data.find(user => user.email === currentUserEmail);

        if (user) {
          this.user.id = user.id;
          this.user.name = user.name;
          this.user.email = user.email;
          this.user.password = user.password;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  },
};
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.settings-icon {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.p-field {
  margin-bottom: 1.5rem;
  width: 100%;
}

.input-text {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.p-button {
  margin-top: 1.5rem;
}

.p-button-icon {
  vertical-align: middle;
}
</style>

