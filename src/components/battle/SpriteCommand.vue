<template>
  <div class="sprite-command" v-if="showCommands && !isAutomated">
    <button v-for="command in commands" :key="command.name"
      :disabled="command.cost > currentMana"
      @click="initiateCommand(command)">
      {{ command.name }}
    </button>
  </div>
  <div class="targets allies" v-if="showAllies && !isAutomated">
    <button v-for="target in allyTargets" :key="target.monsterId" 
      @mouseover="onTargetHover(target.monsterId)"
      @mouseleave="onTargetHover('')"
      @click="onTargetSelect(target.monsterId)">
      {{ target.name }}
    </button>
    <button @click="onBackClick">Back</button>
  </div>
  <div class="targets enemies" v-if="showEnemies && !isAutomated">
    <button v-for="target in enemyTargets" :key="target.monsterId" 
      @mouseover="onTargetHover(target.monsterId)"
      @mouseleave="onTargetHover('')"
      @click="onTargetSelect(target.monsterId)">
      {{ target.name }}
    </button>
    <button @click="onBackClick">Back</button>
  </div>
</template>

<script lang="ts">
import { CounterActor, SelectBlinkingTarget } from '@/injections/battle.injection';
import { Target } from '@/models/battle/target';
import { Skill } from '@/models/skills/skill';
import { SkillTypeEnum } from '@/models/skills/skill-type.enum';
import { TargetEnum } from '@/models/skills/target.enum';
import { SpriteState, SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent, inject, onMounted, PropType, ref } from 'vue'
import useAI from '@/hooks/useAI';

interface Emits {
  'onChange-state'(state: SpriteStateEnum | string): boolean,
  'onExecute-command'(command: Skill): boolean,
  'onTarget-select'(targetIds: string[]): boolean
}

interface Props extends Emits {
  states: SpriteState,
  commands: Skill[],
  allyTargets: Target[],
  enemyTargets: Target[],
  currentMana: number,
  isAutomated: boolean
}

const SpriteCommand = defineComponent({
  props: {
    states: { required: true, type: Object as PropType<SpriteState> },
    commands: { required: true, type: Array as PropType<Skill[]> },
    allyTargets: { required: true, type: Array as PropType<Target[]> },
    enemyTargets: { required: true, type: Array as PropType<Target[]> },
    currentMana: Number,
    isAutomated: Boolean
  },
  emits: {
    'change-state': (state: SpriteStateEnum | string) => state != undefined,
    'execute-command': (command: Skill) => command != undefined,
    'target-select': (targetIds: string[]) => targetIds != undefined
  },
  setup(props: Props, context) {
    const showAllies = ref<boolean>(false);
    const showEnemies = ref<boolean>(false);
    const showCommands = ref<boolean>(true);

    let selectedSkill: Skill = undefined;
    let state: SpriteStateEnum = undefined;

    const { getAction, getSelectedTarget } = useAI(props.commands, props.currentMana, props.allyTargets, props.enemyTargets);

    const counterAction = inject(CounterActor);

    onMounted(() => {
      if (props.isAutomated) {
        setTimeout(() => {
          // non counter action
          if (!counterAction.value) {
            const selectedCommand = getAction();
            initiateCommand(selectedCommand);
            // if single target, call the method
            if (selectedCommand.skillTarget === TargetEnum.ALLY || selectedCommand.skillTarget === TargetEnum.ENEMY) {
              const target = getSelectedTarget(selectedCommand);
              onTargetSelect(target.monsterId);
            }
          } else { // counter action
            const attackCommand = counterAction.value.actor.actorSkills.find(s => s.name === 'Attack');
            initiateCommand(attackCommand);
            onTargetSelect(counterAction.value.target);
          }
        }, 1500)
      }
    })

    const getCommandState = (command: Skill): SpriteStateEnum => {
      switch (command.skillType) {
        case SkillTypeEnum.DAMAGE:
          return SpriteStateEnum.ATTACK;
        case SkillTypeEnum.BUFF:
        case SkillTypeEnum.HEAL:
          return SpriteStateEnum.WIN;
        case SkillTypeEnum.SIGNATURE:
          return SpriteStateEnum.ULTIMATE;
        default:
          return SpriteStateEnum.IDLE;
      }
    }

    const onBackClick = (): void => {
      resetView();
    }

    const resetView = (): void => {
      showCommands.value = true;
      showEnemies.value = false;
      showAllies.value = false;
    }

    const selectBlinkingTarget = inject(SelectBlinkingTarget);

    const initiateCommand = (command: Skill) => {
      showCommands.value = false;

      state = getCommandState(command);
      selectedSkill = command;

      switch (command.skillTarget) {
        case TargetEnum.ENEMY:
          showEnemies.value = true;
          break;
        case TargetEnum.ALLY:
          showAllies.value = true;
          break;
        case TargetEnum.ALL_ENEMIES:
          onMultipleTargets(false);
          break;
        case TargetEnum.ALL_ALLIES:
          onMultipleTargets(true);
          break;
        case TargetEnum.SELF:
          onTargetSelect('self');
          break;
        default:
          throw 'unknown target'
      }
    }

    const onTargetSelect = (monsterId: string) => {
      showEnemies.value = false;
      showAllies.value = false;

      context.emit('target-select', [monsterId])
      emitAnimation();
      selectBlinkingTarget('');
    }

    const onMultipleTargets = (allyTargets: boolean) => {
      emitAnimation();
      if (allyTargets) {
        context.emit('target-select', props.allyTargets.map(t => t.monsterId))
      } else {
        context.emit('target-select', props.enemyTargets.map(t => t.monsterId))
      }
    }

    const emitAnimation = () => {
      context.emit('execute-command', selectedSkill);
      context.emit('change-state', state)
    }

    const onTargetHover = (monsterId: string) => {
      selectBlinkingTarget(monsterId);
    }

    return {
      initiateCommand,
      onTargetHover,
      showAllies,
      showEnemies,
      onBackClick,
      showCommands,
      onTargetSelect
    }
  },
})

export default SpriteCommand;
</script>

<style scoped>
.sprite-command {
  display: flex;
  width: 100%;
  justify-content: center;
}

.targets {
  display: flex;
  width: 100%;
}
</style>