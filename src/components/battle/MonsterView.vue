<template>
  <div class="monster-container" v-if="monster">
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
    <div class="monster-name" :class="{ 'enemy': isEnemy }">
      <span>{{ monster.name }}</span>
    </div>

    <app-sprite
      :sprite="monster.sprite" 
      :isEnemy="isEnemy"
    >
    </app-sprite>
  </div>
</template>

<script lang="ts">
import { Monster as MonsterModel } from '@/models/monster/monster';
import { defineComponent, PropType, ref } from 'vue'
import Sprite from './Sprite.vue';
import StatusBar from './StatusBar.vue';

interface Props {
  monster: MonsterModel,
  isEnemy: boolean
}

const MonsterView = defineComponent({
  components: {
    appStatusBar: StatusBar,
    appSprite: Sprite
  },
  props: {
    monster: { required: true, type: Object as PropType<MonsterModel> },
    isEnemy: Boolean
  },
  setup(props: Props) {
    const monsterRef = ref(props.monster);
    const maxHealth = monsterRef.value.stats.health;
    const maxMana = monsterRef.value.stats.mana;

    if (props.isEnemy) {
      monsterRef.value.stats.health = 200
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
  width: 300px;

  .monster-name {
    font-size: 12px;
    text-align: left;

    &.enemy {
      text-align: right;
    }
  }
}
</style>