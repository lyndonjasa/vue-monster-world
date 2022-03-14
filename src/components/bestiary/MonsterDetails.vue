<template>
  <div class="monster-details-wrapper app-transluscent-div">
    <perfect-scrollbar>
      <template v-if="monster">
        <div class="monster-profile">
          <div class="profile-image">
            <img :src="imagePath" :title="monster.name" />
          </div>
          <div class="profile-description">
            <p class="monster-name">{{ monster.name }}</p>
            <p class="monster-description detail">
              {{ profileDescription }}
            </p>
            <p class="monster-element detail">
              Element: {{ elementString }}
              <base-element :element="monster.element" />
            </p>
            <p class="monster-stage detail">Stage: {{ monster.stage }}</p>
            <p class="monster-evolution detail" v-if="monster.evolution">Evolution: {{ monster.evolution }}</p>
          </div>
        </div>
        <div class="monster-level-details">
          <p class="monster-level-header">Monster Stats</p>
          <div class="monster-stats">
            <div class="stat-header">Stat</div>
            <div class="lvl-1-header">Lvl. 1</div>
            <div class="lvl-25-header">Lvl. 25</div>
            <div class="lvl-50-header">Lvl. 50</div>
            <template v-for="key in keys" :key="key">
              <div class="stat-name">{{ key.toUpperCase() }}</div>
              <div class="lvl-1-stat-value">{{ baseStats[key] }}</div>
              <div class="lvl-25-stat-value">{{ lvl25Stats[key] }}</div>
              <div class="lvl-50-stat-value">{{ lvl50Stats[key] }}</div>
            </template>
          </div>
        </div>
      </template>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { toElementString } from '@/helpers/element.helper';
import { descriptionDictionary } from '@/helpers/monster.helper';
import { IBaseMonster } from '@/state-management/monsters/base-monster.interface'
import { computed, defineComponent, Prop } from 'vue'

interface Props {
  monster: IBaseMonster
}

const MonsterDetails = defineComponent({
  props: {
    monster: { required: false } as Prop<IBaseMonster>
  },
  setup(props: Props) {
    const imagePath = computed(() => {
      const monsterName = props.monster.name.replaceAll(' ', '');

      return require(`@/assets/profiles/${monsterName}_400x300.jpg`);
    });

    const profileDescription = computed(() => {
      return descriptionDictionary.find(dd => dd.name === props.monster.name).description
    });

    const elementString = computed(() => {
      return toElementString(props.monster.element);
    });

    const realignStats = (level: number) => {
      const multiplier = level - 1;

      return {
        health: Math.floor(props.monster.baseStats.health + (props.monster.statGain.health * multiplier)),
        mana: Math.floor(props.monster.baseStats.mana + (props.monster.statGain.mana * multiplier)),
        offense: Math.floor(props.monster.baseStats.offense + (props.monster.statGain.offense * multiplier)),
        defense: Math.floor(props.monster.baseStats.defense + (props.monster.statGain.defense * multiplier)),
        speed: Math.floor(props.monster.baseStats.speed + (props.monster.statGain.speed * multiplier)),
        critRate: +((props.monster.baseStats.critRate + (props.monster.statGain.critRate * multiplier)) * 2.5).toFixed(2)
      }
    }

    const baseStats = computed(() => {
      if (props.monster) return realignStats(1)
      else return {}
    });

    const lvl25Stats = computed(() => {
      if (props.monster) return realignStats(25)
      else return {}
    });
    const lvl50Stats = computed(() => {
      if (props.monster) return realignStats(50)
      else return {}
    });

    const keys = computed(() => Object.keys(baseStats.value));

    return {
      imagePath,
      profileDescription,
      elementString,
      baseStats,
      lvl25Stats,
      lvl50Stats,
      keys
    }
  }
})

export default MonsterDetails
</script>

<style lang="scss" scoped>
.monster-details-wrapper {
  width: calc(100% - 410px);
  padding: 30px;

  .ps {
    background-color: transparent;
    height: 100%;
    width: 100%;
  }

  .monster-profile {
    display: flex;
    justify-content: space-between;

    .profile-image {
      width: 400px;
      height: 300px;
    }

    .profile-description {
      width: calc(100% - 430px);

      .monster-name {
        font-family: Plaguard;
        font-size: 20px;
      }

      .monster-description {
        font-size: 16px;
        word-wrap: break-word;
      }

      .detail {
        margin-top: 15px;
      }
    }
  }

  .monster-level-details {
    margin: 30px 0px;

    .monster-level-header {
      font-size: 18px;
    }

    .monster-stats {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      > * {
        flex-basis: calc(25% - 2px);
        border: 1px solid white;
        text-align: center;
        padding: 8px 0px;
      }
    }
  }
}
</style>