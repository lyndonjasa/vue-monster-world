<template>
  <div class="sprites">
    <div class="team left-team">
      <app-monster v-for="monster in monsters" 
        :key="monster.name" 
        :monster="monster"
        :isEnemy="false"
      >
      </app-monster>
    </div>
    <div class="team right-team">
      <app-monster v-for="monster in enemyMonsters" 
        :key="monster.name" 
        :monster="monster"
        :isEnemy="true"
      >
      </app-monster>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useSpriteFactory from '@/hooks/useSpriteFactory';
import useMonsterFactory from '@/hooks/useMonsterFactory';
import { testMonsterData } from '../../hooks/test-monster-data';
import { Monster } from '@/models/monster/monster';
import MonsterView from './MonsterView.vue';
import _ from 'lodash'

const BattleField = defineComponent({
  components: {
    appMonster: MonsterView
  },
  setup() {
    const { sprites } = useSpriteFactory();
    const { createMonster } = useMonsterFactory();

    const monsterData: Monster[] = [];

    testMonsterData.forEach(m => {
      const monster = createMonster(m.name, 
        m.stats,
        sprites.find(s => s.name === m.name));

      monsterData.push({ ...monster });
    });

    const enemyMonsterData = _.cloneDeep(monsterData);

    const monsters = ref<Monster[]>(monsterData);
    const enemyMonsters = ref<Monster[]>(enemyMonsterData);

    return {
      monsters,
      enemyMonsters
    }
  },
})

export default BattleField;
</script>

<style lang="scss" scoped>
.sprites {
  display: flex;
  justify-content: center;

  .team {
    margin: 0 25px;
  }
}
</style>