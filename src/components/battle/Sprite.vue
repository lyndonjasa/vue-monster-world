<template>
  <div class="sprite-container">
    <app-sprite-canvas
      v-if="currentState"
      :sprite="sprite"
      :spriteState="currentState"
      :isEnemy="isEnemy"
      :blink="blinkingTarget == monsterId"
      @reset-to-idle="resetToIdle"
    >
    </app-sprite-canvas>
    <div class="sprite-command-container">
      <app-sprite-command
        v-if="isCurrentTurn"
        :states="sprite.states"
        :commands="currentActor.actorSkills"
        :allyTargets="allies"
        :enemyTargets="enemies"
        :isAutomated="isAutomated || counterAction"
        :currentMana="currentMana"
        @change-state="changeState"
        @execute-command="onCommandExecution"
        @target-select="selectedTargets = $event"
      >
      </app-sprite-command>
    </div>
  </div>
</template>

<script lang="ts">
import { delayAction } from '@/helpers/delay.helper';
import { BlinkingTarget, CounterActor, CurrentActorKey, InjectedTypewriter, LeftTeamTargets, OnSkillActivationKey, RightTeamTargets, WinningTeam } from '@/injections/battle.injection';
import { Target } from '@/models/battle/target';
import { MonsterTeamEnum } from '@/models/monster/monster-team.enum';
import { Skill } from '@/models/skills/skill';
import { Sprite as SpriteModel } from '@/models/sprites/sprite';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { SpriteStateConfig } from '@/models/sprites/sprite-state-config';
import { computed, defineComponent, inject, onMounted, PropType, ref, watch } from 'vue'
import SpriteCanvas from './SpriteCanvas.vue';
import SpriteCommand from './SpriteCommand.vue';

interface Props {
  sprite: SpriteModel,
  isEnemy: boolean,
  monsterId: string,
  currentHP: number,
  currentMana: number,
  isAutomated: boolean
}

const Sprite = defineComponent({
  components: {
    appSpriteCanvas: SpriteCanvas,
    appSpriteCommand: SpriteCommand
  },
  props: {
    sprite: { required: true, type: Object as PropType<SpriteModel> },
    isEnemy: Boolean,
    monsterId: String,
    currentHP: Number,
    currentMana: Number,
    isAutomated: Boolean
  },
  setup(props: Props) {
    const currentState = ref<SpriteStateConfig>(undefined);
    const selectedSkill = ref<Skill>(undefined);
    const selectedTargets = ref<string[]>([]);
    const onSkillActivation = inject(OnSkillActivationKey);

    const blinkingTarget = inject(BlinkingTarget);

    const leftTeam = inject(LeftTeamTargets);
    const rightTeam = inject(RightTeamTargets);
    const winningTeam = inject(WinningTeam);
    const counterAction = inject(CounterActor);

    watch(winningTeam, async (value: MonsterTeamEnum) => {
      if ((value === MonsterTeamEnum.LEFT && !props.isEnemy) ||
        value === MonsterTeamEnum.RIGHT && props.isEnemy) {
          await delayAction(500);
          currentState.value = props.sprite.getState(SpriteStateEnum.WIN);
        }
    })

    const allies = computed((): Target[] => {
      return !props.isEnemy ? leftTeam.value : rightTeam.value;
    })

    const enemies = computed((): Target[] => {
      return !props.isEnemy ? rightTeam.value : leftTeam.value;
    })

    const changeState = (stateName: SpriteStateEnum) => {
      currentState.value = props.sprite.getState(stateName);

      // if win animation is associated with a skill type heal or buff
      if (selectedSkill.value && selectedTargets.value && stateName === SpriteStateEnum.WIN) {
        setTimeout(() => resetToIdle(true), 2000)
      }
    }

    onMounted(() => {
      resetToIdle(false);
    })

    const resetToIdle = (triggerSkill: boolean) => {
      if (triggerSkill) {
        const isSelfTargeted = selectedTargets.value.includes('self');

        onSkillActivation(props.monsterId, 
          !props.isEnemy ? MonsterTeamEnum.LEFT : MonsterTeamEnum.RIGHT, 
          selectedSkill.value,
          isSelfTargeted ? [props.monsterId] : selectedTargets.value);
      }

      currentState.value = props.sprite.getState(SpriteStateEnum.IDLE);
    }

    const currentActor = inject(CurrentActorKey);
    const isCurrentTurn = computed((): boolean => {
      return currentActor.value?.monsterId === props.monsterId &&
        currentActor.value?.enableAction;
    })

    const targets = computed((): Target[] => {
      return [...allies.value, ...enemies.value];
    });

    const writeMessage = inject(InjectedTypewriter);
    const onCommandExecution = (executedSkill: Skill): void => {
      const actor = targets.value.find(t => t.monsterId === currentActor.value.monsterId);
      writeMessage(`${actor.name} used ${executedSkill.name}`, 1500);
      selectedSkill.value = executedSkill;
    }

    watch(() => props.currentHP, (newValue: number, oldValue: number) => {
      if (newValue < oldValue) {
        changeState(SpriteStateEnum.HIT)
      }

      console.log(newValue);

      if (newValue > 0) {
        setTimeout(() => changeState(SpriteStateEnum.IDLE), 2000)
      } else {
        setTimeout(() => changeState(SpriteStateEnum.DEAD), 2000)
      }
    })

    return {
      currentState,
      changeState,
      resetToIdle,
      isCurrentTurn,
      currentActor,
      selectedSkill,
      allies,
      enemies,
      selectedTargets,
      blinkingTarget,
      onCommandExecution,
      counterAction
    }
  },
})

export default Sprite;
</script>

<style lang="scss" scoped>
.sprite-command-container {
  height: 30px;
}
</style>