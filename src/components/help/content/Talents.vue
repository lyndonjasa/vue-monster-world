<template>
  <div class="help-talents-wrapper">
    <p>Monsters can learn Talents in exchange for talent points which can be gained every time a monster levels up.</p>
    <p>A Talent can either be a "Stat" or a "Battle" talent. A "Stat" talent increases a monster's stat details while "Battle" talents are executed during battles.</p>
    <p>Each talent falls under a stat category and their effects focuses on increasing or maximizing the effect of that stat.</p>
    <div class="talent-category-wrapper">
      <div class="talent-category capitalize">Category</div>
      <div class="talent-description capitalize">Description</div>
      <template v-for="category in talentCategories" :key="category.name">
        <div class="talent-category">{{ category.name }}</div>
        <div class="talent-description">{{ category.description }}</div>
      </template>
    </div>
    <p>For more details on Talents, open monster details and click on Talents</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface TalentCategory {
  name: string;
  description: string;
}

const Talents = defineComponent({
  setup() {
    const talentCategories: TalentCategory[] = [
      {
        name: 'Offense',
        description: 'Focuses on increasing damage output'
      },
      {
        name: 'Health',
        description: 'Focuses on increasing vitality'
      },
      {
        name: 'Mana',
        description: 'Focuses on maxiziming skill usage'
      },
      {
        name: 'Defense',
        description: 'Focuses on decreasing damage received'
      },
      {
        name: 'Speed',
        description: 'Focuses on accuracy and evasion'
      }
    ];

    return {
      talentCategories
    }
  }
})

export default Talents;
</script>

<style lang="scss" scoped>
.help-talents-wrapper {
  font-size: 18px;
  
  p {
    margin-bottom: 20px;
  }

  .talent-category-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    > * {
      border: 1px solid white;
      padding: 10px 15px; 
    }

    .talent-category {
      flex-basis: 25%;
    }

    .talent-description {
      flex-basis: calc(75% - 64px);
    }
  }
}
</style>
