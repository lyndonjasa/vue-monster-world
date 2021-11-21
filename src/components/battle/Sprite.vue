<template>
  <div class="sprite-container">
    <app-sprite-canvas
      v-if="currentState"
      :sprite="sprite"
      :spriteState="currentState"
      :isEnemy="isEnemy"
      @reset-to-idle="resetToIdle"
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
  sprite: SpriteModel,
  isEnemy: boolean
}

const Sprite = defineComponent({
  components: {
    appSpriteCanvas: SpriteCanvas,
    appSpriteCommand: SpriteCommand
  },
  props: {
    sprite: { required: true } as Prop<SpriteModel>,
    isEnemy: Boolean
  },
  setup(props: Props) {
    const currentState = ref<SpriteStateConfig>(undefined);

    const changeState = (stateName: SpriteStateEnum) => {
      currentState.value = props.sprite.getState(stateName);
    }

    onMounted(() => {
      resetToIdle();
    })

    const resetToIdle = () => {
      currentState.value = props.sprite.getState(SpriteStateEnum.IDLE);
    }

    return {
      currentState,
      changeState,
      resetToIdle
    }
  },
})

export default Sprite;
</script>
