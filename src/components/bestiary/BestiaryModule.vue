<template>
  <div class="bestiary-module-wrapper">
    <monster-list-item @select-monster="selectedMonster = $event" />
    <monster-details :monster="selectedMonster" />
  </div>
</template>

<script lang="ts">
import { IBaseMonster } from '@/state-management/monsters/base-monster.interface'
import { defineComponent, ref } from 'vue'
import MonsterDetails from './MonsterDetails.vue'
import MonsterListItem from './MonsterListItem.vue'

const BestiaryModule = defineComponent({
  components: {
    MonsterListItem,
    MonsterDetails
  },
  setup() {
    const selectedMonster = ref<IBaseMonster>(undefined);

    return {
      selectedMonster
    }
  }
})

export default BestiaryModule
</script>

<style lang="scss" scoped>
.bestiary-module-wrapper {
  display: flex;
  width: 1200px;
  justify-content: space-between;
}
</style>