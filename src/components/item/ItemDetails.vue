<template>
  <div class="item-details">
    <div class="item-actions">
      <div class="item-name">
        <fa-icon :icon="itemIcon" />
        {{ item.name }}
      </div>
      <div class="add-item">
        <fa-icon class="cart-icon" :icon="faCartPlus" @click="itemSelected" />
      </div>
    </div>
    <div class="item-description">
      <p>Cost: {{ item.cost }}</p>
      <p>{{ item.description }}</p>
      <p class="item-catch-rate" v-if="catchRates">
        Addtl Catch Rates: {{ catchRates }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ItemResponse } from '@/http/responses/item-response';
import { computed, defineComponent, Prop } from 'vue'
import { faHeart, faScroll, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { startCase } from 'lodash';

interface Emits {
  'onItem-selected': any
}

interface Props extends Emits {
  item: ItemResponse
}

const ItemDetails = defineComponent({
  props: {
    item: { required: true } as Prop<ItemResponse>
  },
  emits: {
    'item-selected': null
  },
  setup(props: Props, context) {
    const itemIcon = computed(() => {
      return props.item.type === 'taming' ? faHeart : faScroll
    });
    const catchRates = computed(() => {
      if (props.item.type !== 'taming') return undefined;

      const stages = Object.keys(props.item.tameRate);
      const rates: string[] = [];
      stages.forEach(s => {
        if (props.item.tameRate[s] !== 0) {
          rates.push(`${startCase(s)}: ${props.item.tameRate[s]}%`)
        }
      });

      if (rates.length === 0) {
        return undefined
      } else {
        return rates.join(', ');
      }
    });

    const itemSelected = () => {
      context.emit('item-selected');
    };

    return {
      itemIcon,
      faCartPlus,
      catchRates,
      itemSelected
    }
  },
})

export default ItemDetails;
</script>

<style lang="scss" scoped>
.item-details {
  padding: 15px 20px;

  .item-actions {
    font-size: 18px;
    display: flex;
    justify-content: space-between;

    .cart-icon {
      filter: brightness(0.5);
      cursor: pointer;

      &:hover {
        filter: brightness(1);
      }
    }
  }

  .item-description {
    font-size: 16px;
    padding: 10px 0px;
    border-bottom: 1px solid white;
  }

  .item-catch-rate {
    margin-top: 10px;
  }
}
</style>