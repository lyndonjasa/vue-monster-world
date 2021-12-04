<template>
  <div class="sprite-command" v-if="showCommands">
    <button v-for="command in commands" :key="command.name"
      @click="initiateCommand(command)">
      {{ command.name }}
    </button>
  </div>
  <div class="targets allies" v-if="showAllies">
    <button v-for="target in allyTargets" :key="target.monsterId" 
      @mouseover="onTargetHover(target.monsterId)"
      @mouseleave="onTargetHover('')"
      @click="onTargetSelect(target.monsterId)">
      {{ target.name }}
    </button>
    <button @click="onBackClick">Back</button>
  </div>
  <div class="targets enemies" v-if="showEnemies">
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
import { Target } from '@/models/battle/target';
import { Skill } from '@/models/skills/skill';
import { SkillTypeEnum } from '@/models/skills/skill-type.enum';
import { TargetEnum } from '@/models/skills/target.enum';
import { SpriteState, SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent, PropType, ref } from 'vue'

interface Emits {
  'onChange-state'(state: SpriteStateEnum | string): boolean,
  'onExecute-command'(command: Skill): boolean,
  'onTarget-select'(targetIds: string[]): boolean
}

interface Props extends Emits {
  states: SpriteState,
  commands: Skill[],
  allyTargets: Target[],
  enemyTargets: Target[]
}

const SpriteCommand = defineComponent({
  props: {
    states: { required: true, type: Object as PropType<SpriteState> },
    commands: { required: true, type: Array as PropType<Skill[]> },
    allyTargets: { required: true, type: Array as PropType<Target[]> },
    enemyTargets: { required: true, type: Array as PropType<Target[]> }
  },
  emits: {
    'change-state': (state: SpriteStateEnum | string) => state != undefined,
    'execute-command': (command: Skill) => command != undefined,
    'target-select': (targetIds: string[]) => targetIds != undefined
  },
  setup(props: Props, context) {
    const changeState = (state: string): void => {
      context.emit('change-state', state);
    }

    const showAllies = ref<boolean>(false);
    const showEnemies = ref<boolean>(false);
    const showCommands = ref<boolean>(true);

    let selectedSkill: Skill = undefined;
    let state: SpriteStateEnum = undefined;

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
        default:
          throw 'unknown target'
      }
    }

    const onTargetSelect = (monsterId: string) => {
      context.emit('change-state', state)
      context.emit('execute-command', selectedSkill);
      context.emit('target-select', [monsterId])
    }

    const onTargetHover = (monsterId: string) => {
      console.log(monsterId);
    }

    return {
      changeState,
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