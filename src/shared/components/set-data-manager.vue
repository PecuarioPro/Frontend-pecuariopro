<script>
export default {
  name: "set-data-manager",

  props: {
    items: {type: Array, required: true},
    title:  {type: { singular: '', plural: ''}, required: true},

  },
  methods:{
    viewMore(){
      this.$emit('viewMore');
    }
  }
}
</script>

<template>

  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img alt="user header" src="/images/usercard.png" />
    </template>
    <template #title>Advanced Card</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <pv-button label="Save" class="w-full" @click="viewMore"/>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>