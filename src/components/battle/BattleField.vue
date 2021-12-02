<template>
  <div class="sprites">
    <div class="team left-team">
      <app-monster v-for="monster in monsters" 
        :key="monster.name" 
        :monster="monster"
        :isEnemy="false"
      >
        <span v-if="isTarget(monster._id)" class="damage-output">{{ fetchDamage(monster._id) }}</span>
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
import { computed, defineComponent, provide, ref, watch } from 'vue'
import useMonsterFactory from '@/hooks/useMonsterFactory';
import useBattleCalculator from '@/hooks/useBattleCalculator';
import useRandomizer from '@/hooks/useRandomizer';
import MonsterView from './MonsterView.vue';
import { DetailedMonster } from '@/models/monster/detailed-monster';
import { MonsterTeamEnum } from '@/models/monster/monster-team.enum';
import { CurrentActorKey, OnSkillActivationKey } from '@/injections/battle.injection';
import _ from 'lodash';
import { Actor } from '@/models/battle/actor';
import { Skill } from '@/models/skills/skill';
import { SkillTypeEnum } from '@/models/skills/skill-type.enum';

const BattleField = defineComponent({
  components: {
    appMonster: MonsterView
  },
  setup() {
    const { getMonsterParty, getEnemyParty } = useMonsterFactory();
    const { calculateSkillDamage, calculateCriticalStrike } = useBattleCalculator();
    const { procCrit, procMiss } = useRandomizer();
    
    const monsters = ref<DetailedMonster[]>([]);
    const enemyMonsters = ref<DetailedMonster[]>([]);
    const targets = ref<{ targetId: string, damageReceived: string }[]>([]);

    getMonsterParty().then(mp => {
      monsters.value = mp
    });

    getEnemyParty().then(emp => {
      enemyMonsters.value = emp
    })

    const orderOfActors = computed((): DetailedMonster[] => {
      const actors = [...monsters.value, ...enemyMonsters.value];

      const sortedActors = _.orderBy(actors, ['stats.speed', '_id'], ['desc', 'asc']);

      return sortedActors;
    })

    const currentActor = ref<Actor>(undefined);
    let actorIndex = 0; // initial value

    watch(orderOfActors, () => {
      currentActor.value = {
        monsterId: orderOfActors.value[actorIndex]._id,
        actorSkills: orderOfActors.value[actorIndex].skills
      };
    });

    // TODO: add target and activited skill on the future
    const onSkillActivation = (actorId: string, team: MonsterTeamEnum, skill: Skill) => {
      let actor: DetailedMonster;
      let target: DetailedMonster;

      if (team == MonsterTeamEnum.LEFT) {
        actor = monsters.value.find(m => m._id === actorId);
        target = enemyMonsters.value[2]; // place holder target
      } else {
        actor = enemyMonsters.value.find(m => m._id === actorId);
        target = monsters.value[0]; // place holder target
      }

      // reduce mana based on skill cost
      actor.stats.mana -= skill.cost;

      let overallDamage = calculateSkillDamage(actor, target, skill);

      // if skill type is not heal, check for procs
      if (skill.skillType !== SkillTypeEnum.HEAL) {
        if (procCrit(actor.stats.critRate)) {
          overallDamage = calculateCriticalStrike(actor, overallDamage);
        }

        if (procMiss(actor.stats.speed, target.stats.speed)) {
          overallDamage = 0;
        }
      }

      if (overallDamage < 0) { // heal
        // if heal exceeds max health, set health to max
        // otherwise calculate
        if ((target.stats.health - overallDamage) > target.stats.maxHealth) {
          target.stats.health = target.stats.maxHealth;
        } else {
          target.stats.health -= overallDamage;
        }
      } else { // damage
        if (overallDamage > target.stats.health) {
          target.stats.health = 0
        } else {
          target.stats.health -= overallDamage;
        }
      }

      targets.value.push({
        targetId: target._id,
        damageReceived: overallDamage !== 0 ? Math.abs(overallDamage).toString() : 'Miss'
      });

      

      for (let index = 0; index < orderOfActors.value.length; index++) {
        if (actorIndex === orderOfActors.value.length - 1) {
          actorIndex = 0; // reset to 0
        } else {
          actorIndex++;
        }

        // if next actor is dead, skip to next actor
        if (orderOfActors.value[actorIndex].stats.health <= 0) {
          continue;
        } else {
          break;
        }
      }

      // reset currentActor after action
      currentActor.value = undefined;

      setTimeout(() => {
        targets.value = [];
        currentActor.value = {
          monsterId: orderOfActors.value[actorIndex]._id,
          actorSkills: orderOfActors.value[actorIndex].skills
        };
      }, 2000)
    }

    provide(OnSkillActivationKey, onSkillActivation);
    provide(CurrentActorKey, currentActor);

    const isTarget = (targetId: string): boolean => {
      return targets.value.find(t => t.targetId === targetId) !== undefined;
    }

    const fetchDamage = (targetId: string): string => {
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