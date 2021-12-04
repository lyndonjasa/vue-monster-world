<template>
  <div class="sprite-command" v-for="command in commands" :key="command.name">
    <button @click="initiateCommand(command)">{{ command.name }}</button>
  </div>
</template>

<script lang="ts">
import { Target } from '@/models/battle/target';
import { Skill } from '@/models/skills/skill';
import { SkillTypeEnum } from '@/models/skills/skill-type.enum';
import { SpriteState, SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent, PropType } from 'vue'

interface Emits {
  'onChange-state': any,
  'onExecute-command': any
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
  emits: [
    'change-state',
    'execute-command'
  ],
  setup(props: Props, context) {
    const changeState = (state: string): void => {
      context.emit('change-state', state);
    }

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

    const initiateCommand = (command: Skill) => {
      const state = getCommandState(command);

      context.emit('change-state', state);
      context.emit('execute-command', command);
    }

    return {
      changeState,
      initiateCommand
    }
  },
})

export default SpriteCommand;
</script>

<style scoped>
.sprite-command {
  display: inline;
}
</style>