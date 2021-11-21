<template>
  <div class="sprites">
    <div class="left-team">
      <app-sprite v-for="sprite in spriteRef" :key="sprite.name"
        :sprite="sprite"
        :isEnemy="false"
      ></app-sprite>
    </div>
    <div class="right-team">
      <app-sprite v-for="sprite in spriteRef" :key="sprite.name"
        :sprite="sprite"
        :isEnemy="true"
      ></app-sprite>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { Sprite as SpriteModel } from '@/models/sprites/sprite';
import Sprite from './Sprite.vue';

const BattleField = defineComponent({
  components: {
    appSprite: Sprite
  },
  setup() {
    const { sprites } = useSpriteFactory();

    const spriteRef = ref<SpriteModel[]>(sprites);

    return {
      spriteRef
    }
  },
})

export default BattleField;
</script>

<style lang="scss" scoped>
.sprites {
  display: flex
}
</style>