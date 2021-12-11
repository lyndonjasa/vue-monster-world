<template>
  <div class="sprites">
    <div class="team left-team">
      <app-monster v-for="monster in monsters" 
        :key="monster.name" 
        :monster="monster"
        :isEnemy="false"
        :isAutomated="true"
      >
        <span class="damage-output" :class="{ 'crit': critProced(monster._id) }">{{ fetchDamage(monster._id) }}</span>
      </app-monster>
    </div>
    <div class="team right-team">
      <app-monster v-for="monster in enemyMonsters" 
        :key="monster.name" 
        :monster="monster"
        :isEnemy="true"
        :isAutomated="false"
      >
        <span class="damage-output" :class="{ 'crit': critProced(monster._id) }">{{ fetchDamage(monster._id) }}</span>
      </app-monster>
    </div>
  </div>
  <div class="battle-notification">{{ writtenMessage }}</div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref, watch } from 'vue'
import useMonsterFactory from '@/hooks/useMonsterFactory';
import useBattleCalculator from '@/hooks/useBattleCalculator';
import useRandomizer from '@/hooks/useRandomizer';
import useBattleEvents from '@/hooks/useBattleEvents';
import useTypewriter from '@/hooks/useTypewriter';
import MonsterView from './MonsterView.vue';
import { DetailedMonster } from '@/models/monster/detailed-monster';
import { MonsterTeamEnum } from '@/models/monster/monster-team.enum';
import { BlinkingTarget, CounterActor, CurrentActorKey, InjectedTypewriter, LeftTeamTargets, OnSkillActivationKey, RightTeamTargets, SelectBlinkingTarget, WinningTeam } from '@/injections/battle.injection';
import _ from 'lodash';
import { Actor } from '@/models/battle/actor';
import { Skill } from '@/models/skills/skill';
import { SkillTypeEnum } from '@/models/skills/skill-type.enum';
import { Target } from '@/models/battle/target';
import { TargetEnum } from '@/models/skills/target.enum';
import { BuffEnum } from '@/models/battle/buff.enum';
import { delayAction } from '@/helpers/delay.helper';
import { TalentEnum } from '@/models/talents/talent.enum';
import useEnvironment from '@/hooks/useEnvironment';

const BattleField = defineComponent({
  components: {
    appMonster: MonsterView
  },
  setup() {
    const { getMonsterParty, getEnemyParty } = useMonsterFactory();
    const { 
      calculateSkillDamage, 
      calculateCriticalStrike, 
      calculatePenaltyDamage, 
      calculateBurnDamage,
      calculateHealthRegen,
      calculateManaRegen,
      calculateRetaliationDamage
    } = useBattleCalculator();

    const { 
      procCrit, 
      procMiss, 
      procStatus,
      procPride
    } = useRandomizer();

    const { 
      regenerateHealth, 
      regenerateMana,
      reduceMana,
      reduceHealth,
      willRegen, 
      applyStatus, 
      hasStatus, 
      triggerBurn, 
      reduceStatusTurns,
      reduceStatusInstance,
      hasTalent,
      removeTalent
    } = useBattleEvents();

    const { 
      vampirismPercentage, 
      resuPercentage,
      efficiencyPercentage,
      lethargyPercentage
    } = useEnvironment();

    const { writtenMessage, writeMessage } = useTypewriter();
    
    const monsters = ref<DetailedMonster[]>([]);
    const enemyMonsters = ref<DetailedMonster[]>([]);
    const targets = ref<{ targetId: string, damageReceived: string, isCrit: boolean }[]>([]);

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

    const leftTeamTargets = computed((): Target[] => {
      return monsters.value.filter(m => m.stats.health > 0).map(m => {
        return {
          monsterId: m._id,
          name: m.name
        }
      })
    })

    const rightTeamTargets = computed((): Target[] => {
      return enemyMonsters.value.filter(m => m.stats.health > 0).map(m => {
        return {
          monsterId: m._id,
          name: m.name
        }
      })
    })

    const winningTeam = ref<MonsterTeamEnum>(MonsterTeamEnum.NEUTRAL);
    watch(leftTeamTargets, async (value: Target[]) => {
      if (value.length === 0) {
        // stop further actions
        clearTimeout(setNextActor);
        await delayAction(2000);
        targets.value = [];
        winningTeam.value = MonsterTeamEnum.RIGHT;
      }
    })

    watch(rightTeamTargets, async (value: Target[]) => {
      if (value.length === 0) {
        // stop further actions
        clearTimeout(setNextActor);
        await delayAction(2000);
        targets.value = [];
        winningTeam.value = MonsterTeamEnum.LEFT;
      }
    })

    provide(WinningTeam, winningTeam);
    provide(LeftTeamTargets, leftTeamTargets);
    provide(RightTeamTargets, rightTeamTargets);

    const blinkingTarget = ref<string>('');
    const selectBlinkingTarget = (monsterId: string) => {
      blinkingTarget.value = monsterId;
    }

    provide(BlinkingTarget, blinkingTarget);
    provide(SelectBlinkingTarget, selectBlinkingTarget);

    const currentActor = ref<Actor>(undefined);
    let actorIndex = 0; // initial value

    watch(orderOfActors, () => {
      currentActor.value = {
        monsterId: orderOfActors.value[actorIndex]._id,
        actorSkills: orderOfActors.value[actorIndex].skills,
        enableAction: false
      };
    });

    provide(InjectedTypewriter, writeMessage);

    watch(currentActor, async (value: Actor) => {
      if (value) {
        writeMessage('', 0)
        const actor = orderOfActors.value.find(a => a._id === value.monsterId);

        const isCounterAction = counterAction.value && counterAction.value.actor.monsterId === actor._id;

        // proceed usual flow if not counter action
        if (!isCounterAction) {
          if (willRegen(actor)) {
            if (hasStatus(actor, BuffEnum.STATIC)) {
              writeMessage(`${actor.name} is unable to regenerate due to staticity`, 2000);
              await delayAction(3000);
              writeMessage('', 0);
            } else {
              regenerateHealth(actor, calculateHealthRegen(actor));
              regenerateMana(actor, calculateManaRegen(actor));
              await delayAction(1000);
            }
          }

          // apply burn damage if actor has burn status
          if (hasStatus(actor, BuffEnum.BURN)) {
            writeMessage(`${actor.name} received damage from burns`, 2000);
            await delayAction(50);
            triggerBurn(actor);
            await delayAction(3000);
            // writeMessage('', 0);
          }
          
          const isStunned = hasStatus(actor, BuffEnum.STUN);
          if (isStunned) {
            writeMessage(`${actor.name} is stunned and unable to act`, 2000);
            await delayAction(3000);
            writeMessage('', 0);
          }

          // reduce statuses that proc per turn
          reduceStatusTurns(actor);

          if (isStunned) { // skip current action and proceed to next if current actor is stunned
            getNextActor();
          }
        }

        await delayAction(1000);
        value.enableAction = true;
      }
    });

    let setNextActor = 0;

    const onSkillActivation = (actorId: string, team: MonsterTeamEnum, skill: Skill, targetIds: string[]) => {
      let actor: DetailedMonster;

      let selectedTargets = orderOfActors.value.filter(a => targetIds.includes(a._id));
      let targetMonsterId: string = undefined;
      if (team == MonsterTeamEnum.LEFT) {
        actor = monsters.value.find(m => m._id === actorId);

        targetMonsterId = enemyMonsters.value.find(e => hasStatus(e, BuffEnum.AGGRO) && e.stats.health !== 0)?._id;
      } else if (MonsterTeamEnum.RIGHT) {
        actor = enemyMonsters.value.find(m => m._id === actorId);

        targetMonsterId = monsters.value.find(e => hasStatus(e, BuffEnum.AGGRO) && e.stats.health !== 0)?._id;
      }

      // if aggro is found and skill is single target, set target to enemy
      if (targetMonsterId && skill.skillTarget === TargetEnum.ENEMY) {
        selectedTargets = [orderOfActors.value.find(a => a._id === targetMonsterId)];
      }

      // reduce mana based on skill cost
      let skillCost = skill.cost;
      // reduce skill cost if actor has efficiency talent
      if (hasTalent(actor, TalentEnum.EFFICIENCY)) {
        skillCost *= efficiencyPercentage
      }

      actor.stats.mana -= skillCost;

      // target loop
      // core battle functionality
      selectedTargets.forEach(target => {
        let overallDamage = calculateSkillDamage(actor, target, skill);
        let critProced = false

        // if skill type is not heal, check for procs
        if (skill.skillType === SkillTypeEnum.DAMAGE || 
            skill.skillType === SkillTypeEnum.SIGNATURE) {
          critProced = procCrit(actor.stats.critRate);
          if (critProced) {
            overallDamage = calculateCriticalStrike(actor, overallDamage);
          }

          if (procMiss(actor, target)) {
            overallDamage = 0;
          } else {
            if (hasStatus(target, BuffEnum.BARRIER)) {
              overallDamage = 1;
              reduceStatusInstance(target, BuffEnum.BARRIER);
            }
          }
        } else if (skill.skillType === SkillTypeEnum.HEAL) {
          overallDamage *= -1;
        } else { // skill type is Buff
          overallDamage = 0;
        }

        const damageText = overallDamage !== 0 ? Math.abs(overallDamage).toString() : 'Miss'

        targets.value.push({
          targetId: target._id,
          damageReceived: skill.skillType !== SkillTypeEnum.BUFF ? damageText : '',
          isCrit: overallDamage !== 0 ? critProced : false
        });

        if (overallDamage < 0) { // heal
          // if heal exceeds max health, set health to max
          // otherwise calculate
          if ((target.stats.health - overallDamage) > target.stats.maxHealth) {
            target.stats.health = target.stats.maxHealth;
          } else {
            target.stats.health -= overallDamage;
          }
        } else { // damage

          // proc vampirism
          if (hasTalent(actor, TalentEnum.VAMPIRISM)) {
            regenerateHealth(actor, overallDamage * vampirismPercentage)
          }

          // proc lethargy
          if (hasTalent(actor, TalentEnum.LETHARGY) && actor._id !== target._id) {
            reduceMana(target, overallDamage * lethargyPercentage);
          }

          // proc retaliation
          if (hasTalent(target, TalentEnum.RETALIATION) && actorId !== target._id) {
            reduceHealth(actor, calculateRetaliationDamage(target))
          }

          if (overallDamage > target.stats.health) {
            target.stats.health = 0

            // proc resurrection
            if (hasTalent(target, TalentEnum.UNDYING)) {
              regenerateHealth(target, target.stats.maxHealth * resuPercentage);
              // undying can only proc once per battle
              removeTalent(target, TalentEnum.UNDYING);
            }
          } else {
            target.stats.health -= overallDamage;

            // set the last target with counter status as counter actor
            if (hasStatus(target, BuffEnum.COUNTER)) {
              counterAction.value = {
                actor: {
                  monsterId: target._id,
                  enableAction: false,
                  actorSkills: target.skills
                },
                target: actor._id
              };
            }
          }
        }

        // apply status to target if status target is set to others and target is still alive
        if (skill.statusEffect && 
            skill.statusEffect.target === TargetEnum.OTHERS && 
            target.stats.health > 0 && 
            (
              (overallDamage > 0 && (skill.skillType === SkillTypeEnum.DAMAGE || skill.skillType === SkillTypeEnum.SIGNATURE)) ||
              (overallDamage <= 0 && (skill.skillType === SkillTypeEnum.HEAL || skill.skillType === SkillTypeEnum.BUFF))
            )) {

          const { statusEffect } = skill;

          if (procStatus(statusEffect.chance)) {
            if (statusEffect.buff === BuffEnum.BURN) {
              statusEffect.appliedDamage = calculateBurnDamage(overallDamage);
            }

            // if skill target is enemy, check for pride talent
            if (skill.skillTarget === TargetEnum.ALL_ENEMIES || skill.skillTarget === TargetEnum.ENEMY) {
              if (!(hasTalent(target, TalentEnum.PRIDE) && procPride())) {
                applyStatus(target, { ...statusEffect });
              }
            } else {
              applyStatus(target, { ...statusEffect });
            }
          }
        } else if (skill.statusEffect && skill.statusEffect.target === TargetEnum.SELF) {
          const { statusEffect } = skill;

          if (statusEffect.buff === BuffEnum.BURN) {
              statusEffect.appliedDamage = calculateBurnDamage(overallDamage);
            }

            applyStatus(actor, { ...statusEffect });
        }
      })

      const isCounterAction = counterAction.value && counterAction.value.actor.monsterId === actor._id;
      if (isCounterAction) {
        reduceStatusInstance(actor, BuffEnum.COUNTER);
        counterAction.value = undefined;
      }

      // TODO: add status target self

      // if skill has penalty, apply damage penalty
      if (skill.penalty) {
        applyPenalties(skill, team, actor);
      }

      getNextActor();
    }

    const counterAction = ref<{ actor: Actor, target: string }>(undefined);
    const hasCounterActor = computed((): boolean => {
      return counterAction.value !== undefined;
    })

    provide(CounterActor, counterAction);

    const getNextActor = (): void => {
      let nextActor: Actor;

      if (!hasCounterActor.value) {
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

        nextActor = {
          monsterId: orderOfActors.value[actorIndex]._id,
          actorSkills: orderOfActors.value[actorIndex].skills,
          enableAction: false
        };
      } else {
        nextActor = {
          monsterId: counterAction.value.actor.monsterId,
          enableAction: false,
          actorSkills: counterAction.value.actor.actorSkills
        }
      }

      // reset currentActor after action
      currentActor.value = undefined;

      setNextActor = setTimeout(() => {
        targets.value = [];
        currentActor.value = {
          monsterId: nextActor.monsterId,
          actorSkills: nextActor.actorSkills,
          enableAction: false
        };
      }, 2000)
    }

    const applyPenalties = (skill: Skill, team: MonsterTeamEnum, actor: DetailedMonster) => {
      const penaltyTargets: DetailedMonster[] = [];
      // penalty targets could only be self or all allies
      if (skill.penalty.target === TargetEnum.SELF) {
        penaltyTargets.push(actor);
      } else {
        if (team === MonsterTeamEnum.LEFT) {
          penaltyTargets.push(...monsters.value);
        } else {
          penaltyTargets.push(...enemyMonsters.value);
        }
      }

      penaltyTargets.forEach(pt => {
        // penalty damage uses base damage
        // status buffs/debuffs and elemental attrs are neglected
        let appliedPenalty = calculatePenaltyDamage(actor, skill, pt);

        // penalty damage cannot kill self or allies
        if ((pt.stats.health - appliedPenalty) < 1) {
          appliedPenalty = pt.stats.health - 1;
        }

        pt.stats.health -= appliedPenalty;
        targets.value.push({
          targetId: pt._id,
          damageReceived: appliedPenalty.toString(),
          isCrit: false
        });
      });
    }

    provide(OnSkillActivationKey, onSkillActivation);
    provide(CurrentActorKey, currentActor);

    const isTarget = (targetId: string): boolean => {
      return targets.value.find(t => t.targetId === targetId) !== undefined;
    }

    const fetchDamage = (targetId: string): string => {
      return targets.value.find(t => t.targetId === targetId)?.damageReceived;
    }

    const critProced = (targetId: string): boolean => {
      return targets.value.find(t => t.targetId === targetId)?.isCrit;
    }

    return {
      monsters,
      enemyMonsters,
      targets,
      isTarget,
      fetchDamage,
      critProced,
      writtenMessage
    }
  },
})

export default BattleField;
</script>

<style lang="scss" scoped>
.sprites {
  display: flex;
  justify-content: center;
  align-items: center;

  .team {
    margin: 0 25px;
  }

  .damage-output {
    color: #fff;
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    font-size: 12px;
    background-color: rbga(0, 0, 0, 0.5);

    &.crit {
      color: red;
    }
  }
}
</style>