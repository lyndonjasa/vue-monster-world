<template>
  <div class="cart-item-wrapper">
    <div class="cart-item-details">
      <div class="cart-item-detail">{{ item.name }}</div>
      <div class="cart-item-detail value">
        <button class="cart-item-btn" @click="addQuantity">+</button>
        {{ item.quantity }}
        <button class="cart-item-btn" @click="reduceQuantity">-</button>
      </div>
      <div class="cart-item-detail">Cost: {{ item.cost }}</div>
      <div class="cart-item-detail value">{{ calculatedAmount }}</div>
    </div>
    <div class="cart-item-remove">
      <fa-icon :icon="faCircleXmark" @click="removeItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from '@/models/items/item';
import { computed, defineComponent, Prop } from 'vue'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface Emits {
  'onUpdate:modelValue'(value: number): boolean,
  'onRemove'(itemId: string): boolean
}

interface Props extends Emits {
  item: Item,
  modelValue: number;
}

const CartItem = defineComponent({
  props: {
    item: { required: true } as Prop<Item>,
    modelValue: { required: true } as Prop<number>
  },
  emits: {
    'update:modelValue': (value: number) => value !== undefined,
    'remove': (itemId: string) => itemId !== undefined
  },
  setup(props: Props, context) {
    const calculatedAmount = computed(() => {
      return props.item.quantity * props.item.cost
    })

    const addQuantity = () => {
      context.emit('update:modelValue', props.item.quantity + 1);
    }

    const reduceQuantity = () => {
      context.emit('update:modelValue', props.item.quantity - 1);
      if (props.item.quantity === 0) {
        removeItem();
      }
    }

    const removeItem = () => {
      context.emit('remove', props.item.itemId)
    }

    return {
      calculatedAmount,
      faCircleXmark,
      removeItem,
      addQuantity,
      reduceQuantity
    }
  },
})

export default CartItem;
</script>

<style lang="scss" scoped>
.cart-item-wrapper {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  .cart-item-details {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 45px);
    align-content: center;

    > * {
      flex-basis: 50%;
      margin: 5px 0;
    }

    .value {
      text-align: right;
    }
  }

  .cart-item-btn {
    border: 2px solid white;
    padding: 2px 3px;
    color: white;
    font-size: 12px;
    background: transparent;
    margin: 0px 5px;
    cursor: pointer;

    &:hover {
      color: black;
      border-color: transparent;
      background-color: white;
    }
  }

  .cart-item-remove {
    align-self: center;
    width: 25px;
    text-align: right;
    cursor: pointer;
    filter: brightness(0.5);

    &:hover {
      filter: brightness(1);
    }
  }
}
</style>