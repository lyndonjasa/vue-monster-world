<template>
  <div class="monster-thumbnail">
    <img :src="src" :title="title" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop } from 'vue'

const BaseMonsterThumnbnail = defineComponent({
  props: {
    src: { required: true } as Prop<any>,
    title: String
  },
})

export default BaseMonsterThumnbnail
</script>

<style lang="scss" scoped>
.monster-thumbnail {
  height: 50px;
  width: 50px;
}
</style>