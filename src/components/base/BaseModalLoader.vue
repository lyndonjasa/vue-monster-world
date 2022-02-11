<template>
  <teleport to="div#app">
    <div class="app-modal-overlay" v-if="showModalLoader">
      <div class="modal-wrapper">
        <loader-sprite :state="idleState"></loader-sprite>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent } from 'vue'
import useLoaders from '@/hooks/store-hooks/useLoaders';
import LoaderSprite from './LoaderSprite.vue';

const BaseModalLoader = defineComponent({
  components: {
    LoaderSprite
  },
  setup() {
    const { showModalLoader } = useLoaders();
    const idleState = SpriteStateEnum.IDLE;

    return {
      idleState,
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
}
</style>
