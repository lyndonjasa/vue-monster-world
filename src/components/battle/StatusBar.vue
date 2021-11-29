<template>
  <div class="status-bar-container">
    <div class="status-bar-value" :style="{
      'background-color': color,
      'width': reflectedValue + '%'
    }"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

interface Props {
  currentValue: number;
  maxValue: number;
  color: string;
}

const StatusBar = defineComponent({
  props: {
    currentValue: Number,
    maxValue: Number,
    color: String
  },
  setup(props: Props) {
    const reflectedValue = computed((): number => {
      return (props.currentValue / props.maxValue) * 100
    })

    return {
      reflectedValue
    }
  },
})

export default StatusBar;
</script>

<style lang="scss" scoped>
.status-bar-container {
  width: 100%;
  border: 1px solid gray;
  margin: 1px 0;

  .status-bar-value {
    height: 5px;
  }
}
</style>