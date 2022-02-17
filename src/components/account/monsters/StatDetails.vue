<template>
  <div class="details" v-for="detail in details" :key="detail.key">
    <div class="detail-key">{{ detail.key }}</div>
    <div class="detail-value">{{ detail.value }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop } from 'vue'

interface Details {
  key: string;
  value: string | number;
  detailedOnly: boolean;
}

const StatDetails = defineComponent({
  props: {
    details: { required: true } as Prop<Details[]>
  }
})

export default StatDetails;
</script>

<style lang="scss" scoped>
.details {
  display: flex;
  flex-basis: 50%;
  margin-bottom: 5px;

  &.flex-100 {
    flex-basis: 100%;
  }
}

.detail-key {
  color: rgba(255, 255, 255, 0.75);
  width: 130px;
}

.detail-value {
  width: 130px;
}
</style>