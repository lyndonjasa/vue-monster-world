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
import useMonsterFactory from '@/hooks/useMonsterFactory';
import { Sprite as SpriteModel } from '@/models/sprites/sprite';
import Sprite from './Sprite.vue';
import { testMonsterData } from '../../hooks/test-monster-data';
import { Monster } from '@/models/monster/monster';

const BattleField = defineComponent({
  components: {
    appSprite: Sprite
  },
  setup() {
    const { sprites } = useSpriteFactory();
    const { createMonster } = useMonsterFactory();

    const monsters = ref<Monster[]>([]);
    testMonsterData.forEach(m => {
      const monster = createMonster(m.name, 
        m.stats,
        sprites.find(s => s.name === m.name));

      monsters.value.push(monster);
    });

    console.log(monsters.value);

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