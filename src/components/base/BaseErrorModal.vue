<template>
  <base-modal 
    :message="errorMessage"
    acceptText="OK"
    closeText="Close">
  </base-modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

const BaseErrorModal = defineComponent({
  setup() {
    const errorMessage = computed(() => {
      return 'This is the error message'
    })

    return {
      errorMessage
    }
  },
})

export default BaseErrorModal;
</script>
