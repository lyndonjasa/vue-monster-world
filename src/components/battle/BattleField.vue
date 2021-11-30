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
        <span v-if="isTarget(monster._id)" class="damage-output">{{ fetchDamage(monster._id) }}</span>
      </app-monster>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import useMonsterFactory from '@/hooks/useMonsterFactory';
import useBattleCalculator from '@/hooks/useBattleCalculator';
import useRandomizer from '@/hooks/useRandomizer';
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
    const { calculateSkillDamage, calculateCriticalStrike } = useBattleCalculator();
    const { procCrit } = useRandomizer();
    
    const monsters = ref<DetailedMonster[]>([]);
    const enemyMonsters = ref<DetailedMonster[]>([]);
    const targets = ref<{ targetId: string, damageReceived: number }[]>([]);

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
      // TODO: replace with actual skill instead of 45
      let overallDamage = calculateSkillDamage(actor, target, 45);
      if (procCrit(actor.stats.critRate)) {
        overallDamage = calculateCriticalStrike(actor, overallDamage);
      }

      targets.value.push({
        targetId: target._id,
        damageReceived: overallDamage
      });

      if (overallDamage > target.stats.health) {
        target.stats.health = 0
      } else {
        target.stats.health -= overallDamage;
      }

      setTimeout(() => {
        targets.value = [];
      }, 2000)
    }

    provide(OnSkillActivationKey, onSkillActivation);

    const isTarget = (targetId: string): boolean => {
      return targets.value.find(t => t.targetId === targetId) !== undefined;
    }

    const fetchDamage = (targetId: string): number => {
      return targets.value.find(t => t.targetId === targetId).damageReceived;
    }

    return {
      monsters,
      enemyMonsters,
      targets,
      isTarget,
      fetchDamage
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

  .damage-output {
    color: #fff;
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    font-size: 12px;
    background-color: rbga(0, 0, 0, 0.5);
  }
}
</style>