<template>
  <div class="help-elements-wrapper">
    <div class="help-elements-header">
      <p>Monsters and Skills have an affinity called "Elements". These Elements affect damage dealt/received by monsters in a
      certain way.</p>
      <p>Skill damage receives a multiplier depending if the skill's element is the receivers elemental weakness/resistance or
        of the same element. See table below for the mulitiplier.
      </p>
      <div class="element-multipliers">
        <div class="element-key"><b>ELEMENT</b></div>
        <div class="element-value"><b>MULTIPLIER</b></div>
        <template v-for="mult in multipliers" :key="mult.description">
          <div class="element-key">{{ mult.description }}</div>
          <div class="element-value">{{ mult.number }}</div>
        </template>
      </div>
      <p>The order of elemental weakness/resistance is as follows:</p>
      <div class="elemental-order">
        <base-element :element="5" :size="35" />
        <fa-icon :icon="faAnglesRight" />
        <base-element :element="1" :size="35" />
        <fa-icon :icon="faAnglesRight" />
        <base-element :element="2" :size="35" />
        <fa-icon :icon="faAnglesRight" />
        <base-element :element="3" :size="35" />
        <fa-icon :icon="faAnglesRight" />
        <base-element :element="4" :size="35" />
        <fa-icon :icon="faAnglesRight" />
        <base-element :element="5" :size="35" />
      </div>
      <p>For example, Ikkakumon with a base element of Water is about to receive a skill damage of 100</p>
      <p>If the skill's element is Rock, Ikkakumon will receive an approximate damage of 150</p>
      <p>If the skill's element is Fire, Ikkakumon will receive an approximate damage of 50</p>
      <p>If the skill's element is Water, Ikkakumon will receive an approximate damage of 75</p>
      <p>Do note the term "approximate" because skill damage takes other factors into account such as defense.</p>
      <p>Non-Elemental Monsters/Skills will always resort to the default multiplier</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface ElementMultiplier {
  description: string;
  number: number;
}

const Elements = defineComponent({
  setup() {
    const multipliers: ElementMultiplier[] = [
      {
        description: 'Weakness',
        number: 1.5
      },
      {
        description: 'Resistance',
        number: 0.5
      },
      {
        description: 'Same Element',
        number: 0.75
      },
      {
        description: 'Default',
        number: 1
      }
    ];

    return {
      multipliers,
      faAnglesRight
    }
  }
})

export default Elements
</script>

<style lang="scss" scoped>
.help-elements-wrapper {
  font-size: 18px;

  p {
    margin-bottom: 25px;
  }

  .element-multipliers {
    width: 500px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto 25px auto;

    > * {
      border: 1px solid white;
      padding: 10px 15px;
      flex-basis: calc(50% - 32px);
      text-align: center;
    }
  }

  .elemental-order {
    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    margin-bottom: 25px;

    > * {
      margin: 0 10px;
    }
  }
}
</style>