<template>
  <div class="help-content-wrapper app-transluscent-div">
    <perfect-scrollbar>
      <router-view></router-view>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const HelpContent = defineComponent({
})

export default HelpContent;
</script>

<style lang="scss" scoped>
.help-content-wrapper {
  width: calc(100% - 390px);
  padding: 20px;

  .ps {
    height: 100%;
    background-color: transparent;
  }
}
</style>