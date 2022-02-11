<template>
  <teleport to="div#app">
    <div class="screen-loader-wrapper" v-if="showScreenLoader">
      <div class="loader-container">
        <loader-sprite :state="displayedState"></loader-sprite>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useLoaders from '@/hooks/store-hooks/useLoaders';
import useRandomizer from '@/hooks/useRandomizer';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { computed, defineComponent } from 'vue'
import LoaderSprite from './LoaderSprite.vue';

const BaseScreenLoader = defineComponent({
  components: {
    LoaderSprite
  },
  setup() {
    const { showScreenLoader } = useLoaders();
    const { randomize } = useRandomizer();

    const displayedState = computed((): SpriteStateEnum => {
      const randomValue = randomize(0, 1)
      if (randomValue === 0) {
        return SpriteStateEnum.ATTACK
      } else {
        return SpriteStateEnum.ULTIMATE
      }
    })

    return {
      showScreenLoader,
      displayedState
    }
  },
})

export default BaseScreenLoader;
</script>

<style lang="scss" scoped>
.screen-loader-wrapper {
  background-color: black;
  height: calc(100% - 90px);
  min-height: 660px;
  position: absolute;
  z-index: 5;
  width: 100%;
  top: 40px;
  display: flex;

  .loader-container {
    align-self: flex-end;
    color: white;
    width: 500px;
    padding-bottom: 50px;
  }
}
</style>
