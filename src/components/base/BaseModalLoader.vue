<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        NOW LOADING
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const BaseModalLoader = defineComponent({
  setup() {
    const showLoader = ref<boolean>(false);

    return {
      showLoader
    }
  },
})

export default BaseModalLoader;
</script>

<style lang="scss" scoped>
.modal-wrapper {
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(20, 17, 36);
  padding: 40px;
  max-width: 500px;
}
</style>
