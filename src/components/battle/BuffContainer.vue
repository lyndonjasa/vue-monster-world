<template>
  <div class="buff-icons-container" :class="{ 'enemy': isEnemy }">
    <app-buff-icon v-for="buff in appliedBuffs" :key="buff.id" :buff="buff"></app-buff-icon>
  </div>
</template>

<script lang="ts">
import { Buff } from '@/models/battle/buff';
import { BuffList } from '@/models/battle/buff-list';
import { Status } from '@/models/skills/status';
import { computed, defineComponent, PropType } from 'vue'
import BuffIcon from './BuffIcon.vue';

interface Props {
  isEnemy: boolean,
  buffs: Status[]
}

const BuffContainer = defineComponent({
  components: {
    appBuffIcon: BuffIcon
  },
  props: {
    isEnemy: Boolean,
    buffs: { required: true, type: Array as PropType<Status[]> }
  },
  setup(props: Props) {

    const appliedBuffs = computed((): Buff[] => {
      const buffIds = props.buffs.map(b => b.buff);

      return BuffList.filter(bl => buffIds.includes(bl.id));
    });

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