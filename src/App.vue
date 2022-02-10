<template>
  <app-header></app-header>
  <div class="content-wrapper">
    <router-view></router-view>
  </div>
  <app-footer></app-footer>
  <base-modal-loader></base-modal-loader>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  }
});
</script>

<style lang="scss">
@import url('./assets/styles.scss');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.content-wrapper {
  height: calc(100vh - 90px);
  min-height: 660px;
}
</style>
