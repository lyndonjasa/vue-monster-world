<template>
  <div class="sprite-container">
    <app-sprite-canvas
      v-if="currentState"
      :sprite="sprite"
      :spriteState="currentState"
    >
    </app-sprite-canvas>
    <app-sprite-command
      :states="sprite.states"
      @change-state="changeState"
    >
    </app-sprite-command> 
    Test
  </div>
</template>

<script lang="ts">
import { Sprite as SpriteModel } from '@/models/sprites/sprite';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { SpriteStateConfig } from '@/models/sprites/sprite-state-config';
import { defineComponent, onMounted, Prop, ref } from 'vue'
import SpriteCanvas from './SpriteCanvas.vue';
import SpriteCommand from './SpriteCommand.vue';

interface Props {
  sprite: SpriteModel
}

const Sprite = defineComponent({
  components: {
    appSpriteCanvas: SpriteCanvas,
    appSpriteCommand: SpriteCommand
  },
  props: {
    sprite: { required: true } as Prop<SpriteModel>
  },
  setup(props: Props) {
    const currentState = ref<SpriteStateConfig>(undefined);

    const changeState = (stateName: SpriteStateEnum) => {
      currentState.value = props.sprite.getState(stateName);
    }

    onMounted(() => {
      currentState.value = props.sprite.getState(SpriteStateEnum.IDLE);
    })

    return {
      currentState,
      changeState
    }
  },
})

export default Sprite;
</script>
