<template>
  <div class="starter-pack-wrapper" :class="{ 'active': selected }">

  </div>
</template>

<script lang="ts">
import { StarterPackResponse } from '@/http/responses';
import { defineComponent, Prop } from 'vue'

const StarterPack = defineComponent({
  props: {
    starterPack: { required: true } as Prop<StarterPackResponse>,
    selected: Boolean
  },
  emits: {
    'select-pack': (group: number) => group !== 0
  },
  setup(_, context) {
    const selectPack = (groupNumber: number) => {
      context.emit('select-pack', groupNumber)
    }

    return {
      selectPack
    }
  },
})

export default StarterPack;
</script>

<style lang="scss" scoped>
.starter-pack-wrapper {
  border: 1px solid white;
  height: 60px;
  width: 100%;
  margin: 15px 0;
}
</style>