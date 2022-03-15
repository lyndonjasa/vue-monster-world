<template>
  <div class="help-menu-wrapper app-transluscent-div">
    <div class="app-ingame-btn btn-elements">Elements</div>
    <div class="app-ingame-btn btn-talents">Talents</div>
    <div class="app-ingame-btn btn-evolutions">Evolutions</div>
    <div class="app-ingame-btn btn-cards">Monster Cards</div>
    <div class="app-ingame-btn btn-credits">Credits</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const HelpMenu = defineComponent({
})

export default HelpMenu;
</script>

<style lang="scss" scoped>
.help-menu-wrapper {
  width: 260px;
  padding: 20px;

  .app-ingame-btn {
    margin-bottom: 15px;
  }
}
</style>