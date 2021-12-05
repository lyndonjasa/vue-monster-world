<template>
  <div class="buff-icons-container">
    <app-buff-icon v-for="buff in appliedBuffs" :key="buff.id" :buff="buff"></app-buff-icon>
  </div>
</template>

<script lang="ts">
import { Buff } from '@/models/battle/buff';
import { defineComponent, ref } from 'vue'
import { BuffList } from '@/models/battle/buff-list';
import { BuffEnum } from '@/models/battle/buff.enum';
import BuffIcon from './BuffIcon.vue';

const BuffContainer = defineComponent({
  components: {
    appBuffIcon: BuffIcon
  },
  setup() {
    const testBuff = ref<Buff>(BuffList.find(b => b.id === BuffEnum.BURN));

    const appliedBuffs = ref<Buff[]>([testBuff.value]);

    return {
      appliedBuffs
    }
  },
})

export default BuffContainer;
</script>
