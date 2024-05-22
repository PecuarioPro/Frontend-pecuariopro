
<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      items: [
        {label: 'Animal', to: '/animal'},
        {label: 'Vaccine', to: '/vaccine'},
        {label: 'Campaign', to: '/campaign'},
        {label: 'Staff', to: '/staff'}
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<template>
  <div>
    <header>
      <pv-toolbar class="bg-primary" fixed>
        <template #start>
          <h1>PecuarioPro</h1>
        </template>
        <template #end>
          <div class="flex-column">
            <router-link v-for="item in items" :key="item.label" :to="item.to">
              <pv-button class="p-button-text text-white">{{item.label}}</pv-button>
            </router-link>
          </div>
        </template>
      </pv-toolbar>
    </header>
    <pv-sidebar v-model="drawer"/>
    <router-view/>
  </div>
</template>
