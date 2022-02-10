<template>
  <div class="starter-pack-wrapper" :class="{ 'active': selected }" @click="selectPack">
    <div class="radio-control-outer">
      <div class="radio-control-inner" :class="{ 'active': selected }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { StarterPackResponse } from '@/http/responses';
import { defineComponent, Prop } from 'vue'

interface Emits {
  'onSelect-pack'(group: number): boolean
}

interface Props extends Emits {
  starterPack: StarterPackResponse;
  selected: boolean;
}

const StarterPack = defineComponent({
  props: {
    starterPack: { required: true } as Prop<StarterPackResponse>,
    selected: Boolean
  },
  emits: {
    'select-pack': (group: number) => group !== 0
  },
  setup(props: Props, context) {
    const selectPack = () => {
      context.emit('select-pack', props.starterPack.group)
    }

    return {
      selectPack
    }
  },
})

export default StarterPack;
</script>

<style lang="scss" scoped>
.starter-pack-wrapper {
  border: 2px solid rgba(255, 255, 255, 0.5);
  height: 80px;
  width: 100%;
  margin: 15px 0;
  cursor: pointer;
  display: flex;
  filter: brightness(0.75);

  &.active {
    border-color: rgba(255, 255, 255, 1);
    filter: brightness(1);
  }

  .radio-control-outer {
    border: 2px solid white;
    height: 20px;
    width: 20px;
    align-self: center;
    display: flex;
    border-radius: 999px;
    margin-left: 10px;
    justify-content: center;

    .radio-control-inner {
      border-radius: 999px;
      height: 14px;
      width: 14px;
      align-self: center;

      &.active {
        background-color: white;
      }
    }
  }
}
</style>