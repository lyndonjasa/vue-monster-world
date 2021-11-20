<template>
  <app-battle-field></app-battle-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BattleField from './components/battle/BattleField.vue';

export default defineComponent({
  name: 'App',
  components: {
    appBattleField: BattleField
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
