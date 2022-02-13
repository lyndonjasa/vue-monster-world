<template>
  <div class="account-monsters-wrapper wrapper-div">
    <template v-if="!selectedMonster">
      <search-monster-form @search="onSearch"></search-monster-form>
      <div class="page-controls" v-if="searchFormValue">
        <div class="page-control">
          Page: &nbsp;
          <select v-model="page">
            <option v-for="i in numberOfPages" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
        <div class="page-control">
          Page Size: &nbsp;
          <select v-model="pageSize">
            <option v-for="i in pageSizeOptions" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
      </div>
    </template>
    <div class="account-monsters-container">
      <div class="loader-container" v-if="showLoader">
        <base-div-loader></base-div-loader>
      </div>
      <template v-if="!showLoader && !selectedMonster">
        <div class="account-monsters" v-if="monsters.length > 0">
          <div class="account-monster" v-for="monster in monsters" :key="monster._id">
            <div class="monster-thumbnail">
              <base-monster-thumbnail :src="getMonsterThumbnail(monster.name)" />
            </div>
            <div class="monster-details">
              <p class="monster-name">{{ monster.computedName }}</p>
              <p class="monster-level">
                <base-element :element="monster.element" />
                Lvl. {{ monster.level }}
              </p>
              <p class="view-details" @click="onMonsterSelect(monster._id)">...View Details</p>
            </div>
          </div>
        </div>
        <div class="empty-monsters-message" v-else>
          No monsters found
        </div>  
      </template>
      <template v-if="!showLoader && selectedMonster">
        <div class="account-monster-detail">
          <div class="back-button" @click="selectedMonster = undefined">
            <fa-icon :icon="faAnglesLeft" /> Back
          </div>
          <account-monster-details 
            :monster="selectedMonster" :showDetailedView="true"
            :showParty="!inParty(selectedMonster._id)"
            :showEvolve="selectedMonster.stage != 'Ultra' && selectedMonster.stage != 'Mega'"
            :showCard="!inParty(selectedMonster._id)">
          </account-monster-details>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { delayAction } from '@/helpers/delay.helper';
import { getMonsterThumbnail } from '@/helpers/monster.helper';
import useAccount from '@/hooks/http-hooks/useAccount';
import { SearchMonsterRequest } from '@/http/requests/search-monster.request';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { SearchMonsterCriteria } from '@/models/monster/search-monster-criteria';
import { computed, defineComponent, inject, ref, watch } from 'vue'
import AccountMonsterDetails from './AccountMonsterDetails.vue';
import SearchMonsterForm from './SearchMonsterForm.vue';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { CurrentAccount } from '@/injections/account.injection';

const AccountMonstersModule = defineComponent({
  components: {
    SearchMonsterForm,
    AccountMonsterDetails
  },
  setup() {
    const { getAccountMonsters, getAccountMonsterDetail } = useAccount();
    const account = inject(CurrentAccount);
    console.log(account.value);

    const page = ref<number>(1);
    const pageSize = ref<number>(10);
    const totalCount = ref<number>(0);
    const pageSizeOptions = [10, 30, 50];
    const showLoader = ref<boolean>(false);

    const monsters = ref<DetailedMonsterResponse[]>([]);
    const selectedMonster = ref<DetailedMonsterResponse>(undefined);

    const numberOfPages = computed(() => {
      if (totalCount.value < pageSize.value) return 1;
      
      let pages = Math.floor(totalCount.value / pageSize.value);
      const remainder = totalCount.value % pageSize.value;
      if (remainder > 0) pages += 1;

      return pages
    })

    watch([page, pageSize], () => {
      onSearch(searchFormValue.value);
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

      showLoader.value = true;
      const result = await getAccountMonsters(searchCriteria);
      totalCount.value = result.totalCount;
      monsters.value = result.monsters;

      await delayAction(1000);
      showLoader.value = false;
      searchFormValue.value = value;
    }

    const inParty = (monsterId: string) => {
      return account.value.party.some(p => p._id === monsterId);
    }

    const onMonsterSelect = async (monsterId: string) => {
      showLoader.value = true;
      selectedMonster.value = await getAccountMonsterDetail(monsterId);
      showLoader.value = false;
    }

    return {
      onSearch,
      getMonsterThumbnail,
      onMonsterSelect,
      totalCount,
      numberOfPages,
      pageSizeOptions,
      monsters,
      showLoader,
      selectedMonster,
      faAnglesLeft,
      page,
      pageSize,
      searchFormValue,
      inParty
    }
  }
})

export default AccountMonstersModule;
</script>

<style lang="scss" scoped>
.account-monsters-wrapper {
  height: 100%;
}

.page-controls {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 7px 0 5px 0;
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

.account-monsters-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  min-height: calc(100% - 215px);

  .account-monsters {
    flex: 1;
    display: flex;
    align-self: flex-start;
    flex-wrap: wrap;
    padding: 20px;

    .account-monster {
      flex-basis: 20%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 25px;

      .monster-details {
        margin-top: 10px;
        flex-basis: 100%;
        text-align: center;

        .view-details {
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;

          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }

  .empty-monsters-message {
    font-size: 20px;
    align-self: center;
  }

  .back-button {
    color: rgba($color: #fff, $alpha: 0.75);
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: rgba($color: #fff, $alpha: 1.0);
    }
  }
}
</style>
