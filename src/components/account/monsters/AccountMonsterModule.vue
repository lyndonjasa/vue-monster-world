<template>
  <div class="account-monsters-wrapper wrapper-div">
    <search-monster-form @search="onSearch"></search-monster-form>
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import { SearchMonsterRequest } from '@/http/requests/search-monster.request';
import { SearchMonsterCriteria } from '@/models/monster/search-monster-criteria';
import { defineComponent, ref } from 'vue'
import SearchMonsterForm from './SearchMonsterForm.vue';

const AccountMonstersModule = defineComponent({
  components: {
    SearchMonsterForm
  },
  setup() {
    const { getAccountMonsters } = useAccount();

    const page = ref<number>(1);
    const pageSize = ref<number>(10);
    const searchFormValue = ref<SearchMonsterCriteria>(undefined);

    const onSearch = async (value: SearchMonsterCriteria) => {
      const searchCriteria: SearchMonsterRequest = {
        page: page.value,
        pageSize: pageSize.value,
        sortProperty: value.sortProperty,
        sortDirection: value.sortDirection,
        searchText: value.searchText,
        filters: {
          elements: value.elements,
          stages: value.stages
        }
      }

      const result = await getAccountMonsters(searchCriteria);
      console.log(result);

      searchFormValue.value = value;
    } 

    return {
      onSearch
    }
  }
})

export default AccountMonstersModule;
</script>

<style lang="scss" scoped>

</style>
