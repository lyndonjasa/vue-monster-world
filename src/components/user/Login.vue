<template>
  Test
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const Login = defineComponent({
  setup() {
    const username = ref<string>(undefined);
    const password = ref<string>(undefined);

    return {
      username,
      password
    }
  },
})

export default Login
</script>
