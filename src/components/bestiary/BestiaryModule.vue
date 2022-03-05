<template>
  <div class="bestiary-module-wrapper">
    <monster-list-item />
    <monster-details />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MonsterDetails from './MonsterDetails.vue'
import MonsterListItem from './MonsterListItem.vue'

const BestiaryModule = defineComponent({
  components: {
    MonsterListItem,
    MonsterDetails
  }
})

export default BestiaryModule
</script>

<style lang="scss" scoped>
.bestiary-module-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>