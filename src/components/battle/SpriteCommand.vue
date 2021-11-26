<template>
  <div class="sprite-command-container">
    <div class="sprite-command" v-for="state in Object.keys(states)" :key="state">
      <button @click="changeState(state)">{{state}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { SpriteState } from '@/models/sprites/sprite-state';
import { defineComponent, PropType } from 'vue'

const SpriteCommand = defineComponent({
  props: {
    states: { required: true, type: Object as PropType<SpriteState> }
  },
  emits: {
    'change-state': (state: string) => state !== undefined
  },
  setup(props, context) {
    const changeState = (state: string): void => {
      context.emit('change-state', state);
    }

    return {
      changeState
    }
  },
})

export default SpriteCommand;
</script>

<style scoped>
.sprite-command {
  display: inline;
}
</style>