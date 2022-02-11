<template>
  <div class="sprite-loaders">
    <sprite-canvas 
      v-for="sprite in sprites" 
      :key="sprite.name"
      :sprite="sprite"
      :isEnemy="false"
      :spriteState="sprite.getState(state)">
    </sprite-canvas>
  </div>
  <div class="loading-text">
    NOW LOADING <span class="loading-dots" :class="{ 'toggle': toggleDots }">. . .</span>
  </div>
</template>

<script lang="ts">
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent, Prop, ref } from 'vue'
import { modalLoaderSprites } from './sprite.loader';
import SpriteCanvas from '@/components/battle/SpriteCanvas.vue'

const LoaderSprite = defineComponent({
  components: {
    SpriteCanvas
  },
  props: {
    state: { required: true } as Prop<SpriteStateEnum>
  },
  setup() {
    const toggleDots = ref<boolean>(false);

    setInterval(() => toggleDots.value = !toggleDots.value, 750)
    const { sprites } = useSpriteFactory(modalLoaderSprites);

    return {
      sprites,
      toggleDots
    }
  },
})

export default LoaderSprite;
</script>

<style lang="scss" scoped>
.sprite-loaders {
  display: flex;
}

.loading-text {
  font-family: 'Plaguard';
  text-align: center;
  margin-top: 15px;
  font-size: 40px;

  .loading-dots {
    opacity: 0;

    &.toggle {
      opacity: 1;
    }
  }
}
</style>