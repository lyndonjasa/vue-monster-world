<template>
  <div class="base-div-loader-wrapper">
    <div class="sprites">
      <loader-sprite :state="state"></loader-sprite>
    </div>
  </div>
</template>

<script lang="ts">
import { SpriteStateEnum } from '@/models/sprites/sprite-state'
import { defineComponent } from 'vue'
import LoaderSprite from './LoaderSprite.vue';

const BaseDivLoader = defineComponent({
  components: {
    LoaderSprite
  },
  setup() {
    const state = SpriteStateEnum.IDLE;

    return {
      state
    }
  }
})

export default BaseDivLoader
</script>

<style lang="scss">
.base-div-loader-wrapper {
  background-color: transparent;
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .sprites {
    max-width: 400px;
  }
}
</style>