<template>
  <div class="buff-icons-container" :class="{ 'enemy': isEnemy }">
    <app-buff-icon v-for="buff in appliedBuffs" :key="buff.id" :buff="buff"></app-buff-icon>
  </div>
</template>

<script lang="ts">
import { Buff } from '@/models/battle/buff';
import { defineComponent, ref } from 'vue'
import BuffIcon from './BuffIcon.vue';

const BuffContainer = defineComponent({
  components: {
    appBuffIcon: BuffIcon
  },
  props: {
    isEnemy: Boolean
  },
  setup() {
    // const testIds: number[] = [1, 2, 3, 4, 5, 6, 12, 10, 11, 8, 17];
    // const testBuff = BuffList.filter(b => testIds.includes(b.id));

    const appliedBuffs = ref<Buff[]>([]);

    return {
      appliedBuffs
    }
  },
})

export default BuffContainer;
</script>

<style lang="scss" scoped>
.buff-icons-container {
  display: flex;
  height: 20px;

  &.enemy {
    justify-content: flex-end;
  }
}
</style>