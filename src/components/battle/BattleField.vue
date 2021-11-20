<template>
  <div class="sprites">
    <app-sprite v-for="sprite in spriteRef" :key="sprite.name"
      :sprite="sprite"
    ></app-sprite>
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
