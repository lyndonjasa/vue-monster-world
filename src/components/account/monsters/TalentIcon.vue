<template>
  <div class="talent-icon-wrapper">
  </div>
</template>

<script lang="ts">
import { ITalent } from '@/state-management/talents/talent.interface'
import { defineComponent, Prop } from 'vue'

const TalentIcon = defineComponent({
  props: {
    talent: { required: true } as Prop<ITalent>
  }
})

export default TalentIcon
</script>

<style lang="scss" scoped>
.talent-icon-wrapper {
  height: 50px;
}
</style>

