<template>
  <div class="account-monsters-wrapper wrapper-div">
    <search-monster-form></search-monster-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchMonsterForm from './SearchMonsterForm.vue';

const AccountMonstersModule = defineComponent({
  components: {
    SearchMonsterForm
  }
})

export default AccountMonstersModule;
</script>

<style lang="scss" scoped>

</style>
