<template>
  <div class="footer-wrapper">
    <p>DISCLAIMER: This is a personal project made by the developer to learn more about the <b>MEVN</b> stack and in no way 
      does it stand to gain any profit. Most, if not all, images/sprites are captured from the web and are requested 
      from their creators.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Footer = defineComponent({
})

export default Footer;
</script>

<style lang="scss" scoped>
.footer-wrapper {
  height: 40px;
  padding: 5px 10px;
  background-color: black;
  text-align: center;

  p {
    color: white;
    font-size: 12px;
  }
}
</style>
