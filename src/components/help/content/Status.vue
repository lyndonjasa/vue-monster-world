<template>
  <div class="help-status-wrapper">
    <div class="help-status-header">
      Some skills has a certain chance to inflict status buff/debuffs that have different effects. Such afflictions can last for a certain
      number of turns or instances
    </div>
    <div class="buff-table">
      <div class="buff-name"><b>NAME</b></div>
      <div class="buff-icon"><b>ICON</b></div>
      <div class="buff-description"><b>DESCRIPTION</b></div>
      <template v-for="buff in buffDescriptions" :key="buff.buffId">
        <div class="buff-name">
          {{ getBuff(buff.buffId).name }}
        </div>
        <div class="buff-icon">
          <buff-icon :buff="getBuff(buff.buffId)" />
        </div>
        <div class="buff-description">
          {{ buff.description }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import BuffIcon from '@/components/battle/BuffIcon.vue';
import useEnvironment from '@/hooks/useEnvironment';
import { BuffList } from '@/models/battle/buff-list';
import { BuffEnum } from '@/models/battle/buff.enum';
import { defineComponent } from 'vue'

const Status = defineComponent({
  components: {
    BuffIcon
  },
  setup() {
    const { wetAmplifier, burnPercentage, blindSpeedReduction } = useEnvironment();

    const buffDescriptions: { buffId: number, description: string }[] = [
      {
        buffId: BuffEnum.BURN,
        description: `Receive Burn damage equal to ${burnPercentage}% of skill damage that applied the status`
      },
      {
        buffId: BuffEnum.WET,
        description: `Damage received is amplified by ${(wetAmplifier - 1).toFixed(2)}%`
      },
      {
        buffId: BuffEnum.BLIND,
        description: `Reduces accuracy of skills by ${(1 - blindSpeedReduction) * 100}%`
      },
      {
        buffId: BuffEnum.STATIC,
        description: 'Unable to regenerate both Health and Mana'
      },
      {
        buffId: BuffEnum.STUN,
        description: 'Unable to act. Monster action will automatically be skipped'
      },
      {
        buffId: BuffEnum.BOOST,
        description: 'Damage dealt will be twice. Stacks multiplicatively w/ Crit Damage and Wrath Talent'
      },
      {
        buffId: BuffEnum.WELTGEIST,
        description: 'Damage dealt will be thrice. Stacks multiplicatively w/ Crit Damage and Wrath Talent'
      },
      {
        buffId: BuffEnum.BARRIER,
        description: 'Converts damage received to 1'
      },
      {
        buffId: BuffEnum.AGGRO,
        description: 'Gains attention of all opponent monsters'
      },
      {
        buffId: BuffEnum.COUNTER,
        description: 'Intrudes an Attack command in between actions when targeted'
      },
      {
        buffId: BuffEnum.POWER_DOWN,
        description: 'Reduces Offense by 25%'
      }
      // {
      //   buffId: BuffEnum.POWER_UP,
      //   description: 'Increase Offense by 25%'
      // },
      // {
      //   buffId: BuffEnum.DEFENSE_DOWN,
      //   description: 'Reduces Defense by 25%'
      // },
      // {
      //   buffId: BuffEnum.DEFENSE_UP,
      //   description: 'Increases Defense by 25%'
      // },
      // {
      //   buffId: BuffEnum.SPEED_DOWN,
      //   description: 'Decreases Speed by 25%'
      // },
      // {
      //   buffId: BuffEnum.SPEED_UP,
      //   description: 'Increases Speed by 25%'
      // },
      // {
      //   buffId: BuffEnum.SILENCE,
      //   description: 'Unable to use skill commands other than Attack'
      // }
    ];

    const getBuff = (id: number) => {
      return BuffList.find(bl => bl.id === id);
    };

    return {
      buffDescriptions,
      getBuff
    }
  },
})

export default Status;
</script>

<style lang="scss" scoped>
.help-status-wrapper {
  font-size: 18px;
  
  .buff-table {
    margin: 25px 0;
    display: flex;
    flex-wrap: wrap;

    > * {
      padding: 15px;
      border: 1px solid white;
    }

    .buff-name {
      flex-basis: 20%;
    }
    
    .buff-icon {
      flex-basis: 10%;
      text-align: center;
    }

    .buff-description {
      flex-basis: calc(70% - 100px);
    }
  }
}
</style>