<template>
  <div class="header-wrapper">
    <span class="header">MONSTER WORLD</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Header = defineComponent({
})

export default Header;
</script>

<style lang="scss" scoped>
.header-wrapper {
  background-color: black;
  padding: 5px 10px;
  height: 30px;

  .header {
    color: white;
    font-family: 'Plaguard';
    font-size: 30px;
  }
}
</style>