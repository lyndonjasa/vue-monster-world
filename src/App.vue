<template>
  <!-- <app-battle-field></app-battle-field> -->
  <router-view></router-view>
  <div class="credits">
    CTTO of the sprite images: {{ credits.join(', ') }} from DeviantArt
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BattleField from './components/battle/BattleField.vue';

export default defineComponent({
  name: 'App',
  components: {
    appBattleField: BattleField
  },
  setup() {
    const credits = [
      'Gunmenagumonred',
      'dragonrod342',
      'matykiller'
    ];

    return {
      credits
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;

  .credits {
    margin-top: 25px;
  }
}
</style>
