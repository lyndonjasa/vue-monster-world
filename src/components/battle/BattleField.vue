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
import { defineComponent, provide, ref } from 'vue'
import useMonsterFactory from '@/hooks/useMonsterFactory';
import MonsterView from './MonsterView.vue';
import _ from 'lodash'
import { DetailedMonster } from '@/models/monster/detailed-monster';
import { MonsterTeamEnum } from '@/models/monster/monster-team.enum';
import { OnSkillActivationKey } from '@/injections/battle.injection';

const BattleField = defineComponent({
  components: {
    appMonster: MonsterView
  },
  setup() {
    const { getMonsterParty, getEnemyParty } = useMonsterFactory();
    
    const monsters = ref<DetailedMonster[]>([]);
    const enemyMonsters = ref<DetailedMonster[]>([]);

    getMonsterParty().then(mp => {
      monsters.value = mp
    });

    getEnemyParty().then(emp => {
      enemyMonsters.value = _.cloneDeep(emp)
    })

    // TODO: add target and activited skill on the future
    const onSkillActivation = (actorId: string, team: MonsterTeamEnum) => {
      let actor: DetailedMonster;
      let target: DetailedMonster;

      if (team == MonsterTeamEnum.LEFT) {
        actor = monsters.value.find(m => m._id === actorId);
        target = enemyMonsters.value[0]; // place holder target
      } else {
        actor = enemyMonsters.value.find(m => m._id === actorId);
        target = monsters.value[0]; // place holder target
      }

      // simulate attack
      // TODO: add defense penetration in the future
      const baseDamage = actor.stats.offense * 45;
      const damageReduction = target.stats.defense * 0.75;

      const overallDamage = Math.ceil(baseDamage / damageReduction);
      target.stats.health -= overallDamage;
    }

    provide(OnSkillActivationKey, onSkillActivation);

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