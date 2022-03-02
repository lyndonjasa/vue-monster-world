<template>
  <div class="menu-item-wrapper" @click="selectItem" :class="{ 'selected': selected }">
    <div class="menu-item-actions">
      <div class="item-name">
        <fa-icon :icon="itemIcon" />
        {{ item.name }}
      </div>
    </div>
    <div class="menu-item-cost">
      <p>Cost: {{ item.cost }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ItemResponse } from '@/http/responses/item-response';
import { faHeart, faScroll } from '@fortawesome/free-solid-svg-icons';
import { computed, defineComponent, Prop } from 'vue'

interface Emits {
  'onSelect': any
}

interface Props extends Emits {
  item: ItemResponse,
  selected: boolean
}

const MenuItem = defineComponent({
  props: {
    item: { required: true } as Prop<ItemResponse>,
    selected: Boolean
  },
  emits: {
    'select': null
  },
  setup(props: Props, context) {
    const itemIcon = computed(() => {
      return props.item.type === 'taming' ? faHeart : faScroll
    });

    const selectItem = () => {
      context.emit('select');
    }

    return {
      itemIcon,
      selectItem
    }
  },
})

export default MenuItem;
</script>

<style lang="scss" scoped>
.menu-item-wrapper {
  padding: 15px 15px;
  font-size: 18px;
  margin: 15px 0;
  border: 1px solid transparent;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }

  &.selected {
    background-color: rgba(255, 255, 255, 0.25);
  }

  .menu-item-actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>