<script>
export default {
  name: "sidebar-options",
  props:{
    visible:Boolean
  }
}

</script>

<template>
  <Sidebar v-model:visible="visible" header="Sidebar">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </Sidebar>
</template>

<style scoped>

</style>