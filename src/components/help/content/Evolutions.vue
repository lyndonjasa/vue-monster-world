<template>
  <div class="help-evolutions-wrapper">
    <p>A key process in making monsters stronger is via "Evolution". Not only do their base stats increase, some aspects such as skill levels and level caps are also increased.</p>
    <p>"Monster Cards" are required in order to evolve a Monster (see Monster Cards section). Once max evolution has been achieved, Evolution is then replaced by "Ascension" which
      further can increase monster stats
    </p>
    <div class="evolution-details-wrapper">
      <div class="evolution-name capitalize">Name</div>
      <div class="evolution-cap capitalize">Level Cap</div>
      <div class="evolution-prerequisite capitalize">Card Requirement (Evolution)</div>
      <div class="evolution-ascension capitalize">Card Requirement (Ascension)</div>
      <template v-for="evolution in evolutions" :key="evolution._id">
        <div class="evolution-name">{{ evolution.name }}</div>
        <div class="evolution-cap">{{ evolution.levelCap }}</div>
        <div class="evolution-prerequisite">{{ evolution.cardPrerequisite }}</div>
        <div class="evolution-ascension">{{ evolution.maxCardBonus }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { defineComponent } from 'vue'

const Evolutions = defineComponent({
  setup() {
    const { evolutions } = useGlobaData();

    return {
      evolutions
    }
  }
})

export default Evolutions;
</script>

<style lang="scss" scoped>
.help-evolutions-wrapper {
  font-size: 20px;

  p {
    margin-bottom: 20px;
  }

  .evolution-details-wrapper {
    display: flex;
    flex-wrap: wrap;

    > * {
      border: 1px solid white;
      padding: 10px 15px;
      flex-basis: 20%;
    }
  }
}
</style>