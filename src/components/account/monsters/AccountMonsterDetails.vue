<template>
  <div class="account-monster-details">
    <div class="monster-sprite">
      <sprite-canvas :spriteState="sprites[0].getState(state)"
        :isEnemy="false"
        :sprite="sprites[0]"></sprite-canvas>
    </div>
    <div class="monster-details">
      <p class="monster-name">{{ monster.computedName }}</p>
      <div class="summary">
        <div class="summary-key">Overview</div>
        <div class="summary-value">
          <div class="details" v-for="detail in overviewDetails" :key="detail.key">
            <div class="detail-key">{{ detail.key }}</div>
            <div class="detail-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
      <div class="summary">
        <div class="summary-key">Stats</div>
        <div class="summary-value"></div>
      </div>
      <div class="summary">
        <div class="summary-key">Skills</div>
        <div class="summary-value"></div>
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
import { defineComponent, Prop } from 'vue'

interface Props {
  monster: DetailedMonsterResponse;
}

interface Details {
  key: string;
  value: string | number;
}

const AccountMonsterDetails = defineComponent({
  components: {
    SpriteCanvas
  },
  props: {
    monster: { required: true } as Prop<DetailedMonsterResponse>
  },
  setup(props: Props) {
    const state = SpriteStateEnum.IDLE;
    const { sprites } = useSpriteFactory([props.monster.sprite]);

    const overviewDetails: Details[] = [
      {
        key: 'Level',
        value: props.monster.level
      },
      {
        key: 'Element',
        value: toElementString(props.monster.element)
      },
      {
        key: 'Current Exp',
        value: props.monster.currentExp
      },
      {
        key: 'To Next Level',
        value: props.monster.expToLevel
      }
    ];

    return {
      state,
      sprites,
      overviewDetails
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
    align-items: flex-end;
    margin-right: 20px;
  }

  .monster-details {
    width: calc(100% - 260px);
    align-self: stretch;
    font-size: 15px;

    .monster-name {
      font-weight: bold;
    }

    .summary {
      margin: 10px 0;
      display: flex;
      align-items: flex-start;

      .summary-key {
        width: 100px;
      }

      .summary-value {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 50px);
        justify-content: space-between;

        .details {
          display: flex;
          flex-basis: 50%;
          margin-bottom: 5px;

          > * {
            width: 50%;
          }

          .detail-key {
            color: rgba(255, 255, 255, 0.75);
          }
        }
      }
    }
  }
}
</style>