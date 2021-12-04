<template>
  <div class="monster-container" v-if="monster">
    <div class="status-bars" :class="{ 'enemy': isEnemy }">
      <app-status-bar
        :currentValue="monsterRef.stats.health"
        :maxValue="maxHealth"
        color="green"
      >
      </app-status-bar>
      <app-status-bar
        :currentValue="monsterRef.stats.mana"
        :maxValue="maxMana"
        color="blue"
      >
      </app-status-bar>
    </div>

    <div class="monster-name" :class="{ 'enemy': isEnemy }">
      <span>{{ monster.name }}</span>
    </div>

    <div class="damage-output-slot">
      <slot></slot>
    </div>

    <app-sprite
      :sprite="monster.sprite" 
      :isEnemy="isEnemy"
      :monsterId="monster._id"
      :currentHP="monsterRef.stats.health"
      :currentMana="monsterRef.stats.mana"
      :isAutomated="isAutomated"
    >
    </app-sprite>
  </div>
</template>

<script lang="ts">
import { DetailedMonster as MonsterModel } from '@/models/monster/detailed-monster';
import { defineComponent, PropType, ref } from 'vue'
import Sprite from './Sprite.vue';
import StatusBar from './StatusBar.vue';

interface Props {
  monster: MonsterModel,
  isEnemy: boolean,
  isAutomated: boolean
}

const MonsterView = defineComponent({
  components: {
    appStatusBar: StatusBar,
    appSprite: Sprite
  },
  props: {
    monster: { required: true, type: Object as PropType<MonsterModel> },
    isEnemy: Boolean,
    isAutomated: Boolean
  },
  setup(props: Props) {
    const monsterRef = ref(props.monster);
    const maxHealth = monsterRef.value.stats.maxHealth;
    const maxMana = monsterRef.value.stats.maxMana;

    if (!props.isEnemy) {
      monsterRef.value.stats.health = 50
    }

    return {
      maxHealth,
      maxMana,
      monsterRef
    }
  }
})

export default MonsterView;
</script>

<style lang="scss" scoped>
.monster-container {
  position: relative;
  width: 300px;

  .monster-name {
    font-size: 12px;
    text-align: left;

    &.enemy {
      text-align: right;
    }
  }

  .status-bars {
    width: 35%;

    &.enemy {
      margin-left: 65%;
      transform: scaleX(-1);
    }
  }

  .damage-output-slot {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>