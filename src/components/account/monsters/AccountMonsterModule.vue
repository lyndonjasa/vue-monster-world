<template>
  <div class="account-monsters-wrapper wrapper-div">
    <search-monster-form @search="onSearch"></search-monster-form>
    <div class="page-controls" v-show="totalCount > 0">
      <div class="page-control">
        Page: &nbsp;
        <select>
          <option v-for="i in numberOfPages" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>
      <div class="page-control">
        Page Size: &nbsp;
        <select>
          <option v-for="i in pageSizeOptions" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import { SearchMonsterRequest } from '@/http/requests/search-monster.request';
import { SearchMonsterCriteria } from '@/models/monster/search-monster-criteria';
import { computed, defineComponent, ref } from 'vue'
import SearchMonsterForm from './SearchMonsterForm.vue';

const AccountMonstersModule = defineComponent({
  components: {
    SearchMonsterForm
  },
  setup() {
    const { getAccountMonsters } = useAccount();

    const page = ref<number>(1);
    const pageSize = ref<number>(10);
    const totalCount = ref<number>(0);

    const pageSizeOptions = [10, 30, 50];

    const numberOfPages = computed(() => {
      if (totalCount.value < pageSize.value) return 1;
      
      let pages = Math.floor(totalCount.value / pageSize.value);
      const remainder = totalCount.value % pageSize.value;
      if (remainder > 0) pages += 1;

      return pages
    })

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
      totalCount.value = result.totalCount;

      searchFormValue.value = value;
    } 

    return {
      onSearch,
      totalCount,
      numberOfPages,
      pageSizeOptions
    }
  }
})

export default AccountMonstersModule;
</script>

<style lang="scss" scoped>
.page-controls {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;

  .page-control {
    margin-right: 30px;

    select {
      font-family: inherit;
      background: transparent;
      color: white;
      padding: 5px;

      option {
        background: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>
