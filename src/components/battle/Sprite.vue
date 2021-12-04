<template>
  <div class="sprite-container">
    <app-sprite-canvas
      v-if="currentState"
      :sprite="sprite"
      :spriteState="currentState"
      :isEnemy="isEnemy"
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
        @change-state="changeState"
        @execute-command="selectedSkill = $event"
      >
      </app-sprite-command>
    </div>
  </div>
</template>

<script lang="ts">
import { CurrentActorKey, LeftTeamTargets, OnSkillActivationKey, RightTeamTargets } from '@/injections/battle.injection';
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
  currentHP: number
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
    currentHP: Number
  },
  setup(props: Props) {
    const currentState = ref<SpriteStateConfig>(undefined);
    const selectedSkill = ref<Skill>(undefined);
    const onSkillActivation = inject(OnSkillActivationKey);

    const leftTeam = inject(LeftTeamTargets);
    const rightTeam = inject(RightTeamTargets);

    const allies = computed((): Target[] => {
      return !props.isEnemy ? leftTeam.value : rightTeam.value;
    })

    const enemies = computed((): Target[] => {
      return !props.isEnemy ? rightTeam.value : leftTeam.value;
    })

    const changeState = (stateName: SpriteStateEnum) => {
      currentState.value = props.sprite.getState(stateName);
    }

    onMounted(() => {
      resetToIdle(false);
    })

    const resetToIdle = (triggerSkill: boolean) => {
      if (triggerSkill) {
        onSkillActivation(props.monsterId, 
          !props.isEnemy ? MonsterTeamEnum.LEFT : MonsterTeamEnum.RIGHT, 
          selectedSkill.value);
      }

      currentState.value = props.sprite.getState(SpriteStateEnum.IDLE);
    }

    const currentActor = inject(CurrentActorKey);
    const isCurrentTurn = computed((): boolean => {
      return currentActor.value?.monsterId === props.monsterId;
    })

    watch(() => props.currentHP, (newValue: number, oldValue: number) => {
      if (newValue < oldValue) {
        changeState(SpriteStateEnum.HIT)
      } else {
        changeState(SpriteStateEnum.WIN) // animation for HEAL
      }

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
      enemies
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