<template>
  <teleport to="div#app">
    <div class="app-modal-overlay" v-show="showModalLoader">
      <div class="modal-wrapper">
        <div class="sprite-loaders">
          <sprite-canvas 
            v-for="sprite in sprites" 
            :key="sprite.name"
            :sprite="sprite"
            :isEnemy="false"
            :spriteState="sprite.getState(idleState)">
          </sprite-canvas>
        </div>
        <div class="loading-text">
          NOW LOADING <span class="loading-dots" :class="{ 'toggle': toggleDots }">. . .</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent, ref } from 'vue'
import SpriteCanvas from '../battle/SpriteCanvas.vue';
import { modalLoaderSprites } from './sprite.loader';
import useLoaders from '@/hooks/store-hooks/useLoaders';

const BaseModalLoader = defineComponent({
  components: {
    SpriteCanvas
  },
  setup() {
    const { showModalLoader } = useLoaders();

    const showLoader = ref<boolean>(false);
    const toggleDots = ref<boolean>(false);

    setInterval(() => toggleDots.value = !toggleDots.value, 750)
    const { sprites } = useSpriteFactory(modalLoaderSprites);
    const idleState = SpriteStateEnum.IDLE;

    return {
      showLoader,
      sprites,
      idleState,
      toggleDots,
      showModalLoader
    }
  },
})

export default BaseModalLoader;
</script>

<style lang="scss" scoped>
.modal-wrapper {
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(20, 17, 36);
  padding: 40px;
  max-width: 500px;

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
}
</style>
