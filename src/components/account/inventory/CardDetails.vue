<template>
  <div class="card-details">
    <div class="card-thumbnail">
      <base-monster-thumbnail :src="thumbnail" :title="`${card.quantity} ${card.monsterName} card(s)`" />
      <div class="card-quantity" v-if="!hideQuantity">{{ card.quantity }}</div>
    </div>
    <p class="card-name">{{ card.cardDisplayName || card.monsterName }}</p>
  </div>
</template>

<script lang="ts">
import { getMonsterThumbnail } from '@/helpers/monster.helper'
import { ICard } from '@/http/responses/card-inventory.response'
import { computed, defineComponent, Prop } from 'vue'

interface Props {
  card: ICard,
  hideQuantity: boolean
}

const CardDetails = defineComponent({
  props: {
    card: { required: true } as Prop<ICard>,
    hideQuantity: { default: false } as Prop<boolean>
  },
  setup(props: Props) {
    const thumbnail = computed(() => {
      return getMonsterThumbnail(props.card.monsterName)
    })

    return {
      thumbnail
    }
  }
})

export default CardDetails;
</script>

<style lang="scss" scoped>
.card-details {
  .card-thumbnail {
    display: flex;
    justify-content: center;

    .card-quantity {
      position: absolute;
      padding: 5px 8px;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 999px;
      margin-left: 55px;
      margin-top: -10px;
      font-size: 12px;
    }
  }

  .card-name {
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>