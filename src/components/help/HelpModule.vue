<template>
  <div class="help-module-wrapper">
    <help-menu />
    <help-content />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelpContent from './HelpContent.vue'
import HelpMenu from './HelpMenu.vue'

const HelpModule =  defineComponent({
  components: {
    HelpMenu,
    HelpContent
  }
})

export default HelpModule
</script>

<style lang="scss" scoped>
.help-module-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>