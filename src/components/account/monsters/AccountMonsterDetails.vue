<template>
  <div class="account-monster-details">
    <div class="monster-sprite">
      <sprite-canvas :spriteState="sprites[0].getState(state)"
        :isEnemy="false"
        :sprite="sprites[0]"></sprite-canvas>
    </div>
    <div class="monster-details">
      <p class="monster-name" v-on="enableSelection ? { click: onMonsterSelect } : {}"
        :class="{ 'clickable' : enableSelection }"
        :title="enableSelection ? 'Click to view details' : ''">
        {{ monster.computedName }}
        <span class="expand-icon">... <fa-icon :icon="faUpRightAndDownLeftFromCenter" /></span>
      </p>
      <div class="summary">
        <div class="summary-key">Overview</div>
        <div class="summary-value">
          <div class="details" v-for="detail in overviewDetails" 
            :key="detail.key">
            <div class="detail-key">{{ detail.key }}</div>
            <div class="detail-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
      <div class="summary">
        <div class="summary-key">Stats</div>
        <div class="summary-value">
          <div class="details" v-for="detail in statDetails" :key="detail.key">
            <div class="detail-key">{{ detail.key }}</div>
            <div class="detail-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
      <div class="summary">
        <div class="summary-key">Skills</div>
        <div class="summary-value" v-if="showDetailedView">Detailed Skills</div>
        <div class="summary-value" v-else>
          <div class="skill-details" v-for="skill in skills" :key="skill.name">
            <div class="skill-element"><base-element :element="skill.skillElement"></base-element></div>
            <div class="skill-name">{{ skill.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import SpriteCanvas from '@/components/battle/SpriteCanvas.vue';
import { toElementString } from '@/helpers/element.helper';
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { computed, defineComponent, Prop } from 'vue'
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'

interface Emits {
  'onSelect-monster'(monsterId: string): boolean
}

interface Props extends Emits {
  monster: DetailedMonsterResponse;
  showDetailedView: boolean;
  enableSelection: boolean;
}

interface Details {
  key: string;
  value: string | number;
  detailedOnly: boolean;
}

const AccountMonsterDetails = defineComponent({
  components: {
    SpriteCanvas
  },
  props: {
    monster: { required: true } as Prop<DetailedMonsterResponse>,
    showDetailedView: { default: false } as Prop<boolean>,
    enableSelection: { default: false } as Prop<boolean>
  },
  emits: {
    'select-monster': (monsterId: string) => monsterId !== undefined
  },
  setup(props: Props, context) {
    const state = SpriteStateEnum.IDLE;
    const { sprites } = useSpriteFactory([props.monster.sprite]);

    const overviewDetailsValue: Details[] = [
      {
        key: 'Level',
        value: props.monster.level,
        detailedOnly: false
      },
      {
        key: 'Element',
        value: toElementString(props.monster.element),
        detailedOnly: false
      },
      {
        key: 'Current Exp',
        value: props.monster.currentExp,
        detailedOnly: true
      },
      {
        key: 'Evolution',
        value: props.monster.stage,
        detailedOnly: true
      },
      {
        key: 'To Next Level',
        value: props.monster.expToLevel === 0 ? '----' : props.monster.expToLevel,
        detailedOnly: true
      }
    ];

    const overviewDetails = computed((): Details[] => {
      if (!props.showDetailedView) {
        return overviewDetailsValue.filter(odv => !odv.detailedOnly)
      } else {
        return overviewDetailsValue
      }
    })

    // TODO: add showing of talents

    const { stats, skills } = props.monster
    const statDetailsValue: Details[] = [
      {
        key: 'Health',
        value: stats.health,
        detailedOnly: false
      },
      {
        key: 'Health Regen',
        value: stats.healthRegen + '%',
        detailedOnly: true
      },
      {
        key: 'Mana',
        value: stats.mana,
        detailedOnly: false
      },
      {
        key: 'Mana Regen',
        value: stats.manaRegen + '%',
        detailedOnly: true
      },
      {
        key: 'Offense',
        value: stats.offense,
        detailedOnly: true
      },
      {
        key: 'Defense',
        value: stats.defense,
        detailedOnly: true
      },
      {
        key: 'Crit Rate',
        value: stats.critRate + '%',
        detailedOnly: true
      },
      {
        key: 'Speed',
        value: stats.speed,
        detailedOnly: true
      },
      {
        key: 'Crit Damage',
        value: stats.critDamage + '%',
        detailedOnly: true
      }
    ]

    const statDetails = computed((): Details[] => {
      if (!props.showDetailedView) {
        return statDetailsValue.filter(odv => !odv.detailedOnly)
      } else {
        return statDetailsValue
      }
    })

    const onMonsterSelect = (): void => {
      context.emit('select-monster', props.monster._id);
    }

    return {
      state,
      sprites,
      overviewDetails,
      statDetails,
      skills,
      onMonsterSelect,
      faUpRightAndDownLeftFromCenter
    }
  },
})

export default AccountMonsterDetails;
</script>

<style lang="scss" scoped>
.account-monster-details {
  display: flex;
  border: 1px solid white;
  border-radius: 3px;
  padding: 20px 10px;
  margin-bottom: 15px;

  .monster-sprite {
    width: 240px;
    min-height: 150px;
    display: flex;
    align-items: flex-start;
    margin-right: 20px;

    .sprite-canvas-container {
      margin: 0 auto !important;
    }
  }

  .monster-details {
    width: calc(100% - 260px);
    align-self: stretch;
    font-size: 15px;

    .monster-name {
      font-weight: bold;

      &.clickable {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .summary {
      margin: 10px 0 15px 0;
      display: flex;
      align-items: flex-start;

      .summary-key {
        width: 100px;
      }

      .summary-value {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 50px);

        .details {
          display: flex;
          flex-basis: 50%;
          margin-bottom: 5px;
        }

        .detail-key {
          color: rgba(255, 255, 255, 0.75);
          width: 130px;
        }

        .detail-value {
          width: 130px;
        }

        .skill-details {
          display: flex;
          flex-basis: 50%;
          margin-bottom: 5px;

          .skill-name {
            align-self: flex-end;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>