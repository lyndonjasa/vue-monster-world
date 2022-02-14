<template>
  <base-modal
    v-if="displayedError"
    :message="displayedError"
    acceptText="OK"
    closeText="Close"
    @close="closeModal"
    @accept="closeModal">
  </base-modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import useErrors from '@/hooks/store-hooks/useErrors';

const BaseErrorModal = defineComponent({
  setup() {
    const { errorMessage } = useErrors();

    const displayedError = computed(() => {
      return errorMessage.value
    })

    const closeModal = () => {
      errorMessage.value = undefined;
    }

    return {
      displayedError,
      closeModal
    }
  },
})

export default BaseErrorModal;
</script>
