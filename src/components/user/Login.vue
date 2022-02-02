<script lang="ts">
import { defineComponent, ref } from 'vue'

const Login = defineComponent({
  setup() {
    const username = ref<string>(undefined);
    const password = ref<string>(undefined);
    const firstName = ref<string>(undefined);
    const lastName = ref<string>(undefined);

    return {
      username,
      password,
      firstName,
      lastName
    }
  },
})

export default Login
</script>
