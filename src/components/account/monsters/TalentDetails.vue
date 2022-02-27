<template>
  <div class="talent-details-wrapper">
    <p class="talent-details-title">Talent Details</p>
    <div class="talent-details">
      <template v-if="talent">
        <div class="talent-details-header">
          <talent-icon :talent="talent" :active="true" :unlocked="true" :disableHover="true" />
          <div class="talent-name">{{ talent.name }}</div>
        </div>
        <div class="talent-details-body">
          <div class="talent-description">
            {{ talent.description }}
          </div>
          <div class="talent-requirements">
            <p>PRE-REQUISITES:</p>
            <div class="requirement">
              <div class="key">Points:</div>
              <div class="val">{{ talent.points }}</div>
            </div>
            <div class="requirement" v-if="talent.prerequisite">
              <div class="key">Talent:</div>
              <div class="val">{{ talent.prerequisite }}</div>
            </div>
          </div>
          <div class="talent-actions" v-if="!preloaded">
            <button 
              class="app-generic-btn"
              v-if="!activated"
              @click="activateTalent"
              :disabled="(talentPoints < talent.points) || !unlocked">Activate</button>
            <button 
              class="app-generic-btn"
              v-if="activated"
              @click="deactivateTalent">Deactivate</button>
          </div>
        </div>
      </template>
    </div>
    <div class="talent-detail-points">
      Talent Points: {{ talentPoints }}
    </div>
  </div>
</template>

<script lang="ts">
import { ITalent } from '@/state-management/talents/talent.interface';
import { defineComponent, Prop } from 'vue'
import TalentIcon from './TalentIcon.vue';

interface Emits {
  'onActivate-talent'(talent: ITalent): boolean,
  'onDeactivate-talent'(talent: ITalent): boolean
}

interface Props extends Emits {
  talent: ITalent,
  activated: boolean,
  preloaded: boolean,
  unlocked: boolean,
  talentPoints: number;
}

const TalentDetails = defineComponent({
  components: {
    TalentIcon
  },
  props: {
    talent: { required: false } as Prop<ITalent>,
    activated: Boolean,
    preloaded: Boolean,
    unlocked: Boolean,
    talentPoints: { default: 0 } as Prop<number>
  },
  emits: {
    'activate-talent': (talent: ITalent) => talent !== undefined,
    'deactivate-talent': (talent: ITalent) => talent !== undefined
  },
  setup(props: Props, context) {
    const activateTalent = () => {
      context.emit('activate-talent', props.talent);
    }

    const deactivateTalent = () => {
      context.emit('deactivate-talent', props.talent);
    }

    return {
      activateTalent,
      deactivateTalent
    }
  }
})

export default TalentDetails;
</script>

<style lang="scss" scoped>
.talent-details-wrapper {

  .talent-details-title {
    text-align: center;
  }

  .talent-details-header {
    margin: 15px 0px;
    display: flex;
    justify-content: space-evenly;
    align-content: center;

    .talent-name {
      display: inherit;
      align-items: center;
      font-size: 18px;
    }
  }

  .talent-details {
    height: 430px;
  }

  .talent-details-body {
    margin-top: 25px;

    .talent-description {
      font-size: 18px;
    }

    .talent-requirements {
      margin: 15px 0 0;

      p {
        margin-bottom: 15px;
      }

      .requirement {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: left;

        div {
          width: 30%;
        }
      }
    }

    .talent-actions {
      margin-top: 25px;
    }
  }
}
</style>