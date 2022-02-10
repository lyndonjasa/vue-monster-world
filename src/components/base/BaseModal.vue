<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-actions">
          <button class="app-generic-btn" @click="onAcceptClick">{{ acceptText }}</button>
          <button class="app-generic-btn" @click="onCloseClick">{{ closeText }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, Prop } from "vue";

const BaseModal = defineComponent({
  props: {
    message: { required: true } as Prop<string>,
    acceptText: { default: 'Accept' } as Prop<string>,
    closeText: { default: 'Close' } as Prop<string>
  },
  emits: {
    accept: null,
    close: null
  },
  setup(_, context) {
    const onAcceptClick = () => {
      context.emit('accept')
    }

    const onCloseClick = () => {
      context.emit('close');
    }

    return {
      onAcceptClick,
      onCloseClick
    }
  }
})

export default BaseModal;
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

  .modal-body {
    text-align: center;
    font-size: 18px;
  }

  .modal-actions {
    margin-top: 25px;
    display: flex;
    justify-content: center;

    button {
      margin: 0 15px;
    }
  }
}
</style>