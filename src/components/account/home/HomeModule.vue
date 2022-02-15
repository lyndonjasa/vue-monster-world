<template>
  <base-div-loader v-if="showLoader"></base-div-loader>
  <div class="home-module-wrapper wrapper-div" v-else>
    <p class="home-title wrapper-title">PARTY COMPOSITION:</p>
    <div class="account-party" v-if="!selectedMonster">
      <account-monster-details v-for="monster in monsterParty" 
        :key="monster._id"
        :monster="monster"
        :enableSelection="true"
        @select-monster="loadMonsterDetail">
      </account-monster-details>
    </div>
    <div class="account-monster-detail" v-else>
      <p class="back-button" @click="selectedMonster = undefined">
        <fa-icon :icon="faAnglesLeft" title="Back" />
        Back
      </p>
      <account-monster-details
        v-if="selectedMonster"
        :monster="selectedMonster"
        :enableSelection="false"
        :showDetailedView="true"
        :showCard="false"
        :showRemove="enableRemove"
        @update-monster="onMonsterRemoval"
        @monster-evolved="onMonsterEvolution">
      </account-monster-details>
    </div>
  </div>
</template>

<script lang="ts">
import { delayAction } from '@/helpers/delay.helper';
import useAccount from '@/hooks/http-hooks/useAccount';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { computed, defineComponent, ref } from 'vue'
import AccountMonsterDetails from '../monsters/AccountMonsterDetails.vue';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import useGlobaData from '@/hooks/store-hooks/useGlobalData';

const HomeModule = defineComponent({
  components: {
    AccountMonsterDetails
  },
  setup() {
    const { getAccountParty, getAccountMonsterDetail } = useAccount();
    const { reloadAccountCards } = useGlobaData();
    const monsterParty = ref<DetailedMonsterResponse[]>([]);
    const selectedMonster = ref<DetailedMonsterResponse>(undefined);

    const showLoader = ref<boolean>(false);

    const loadParty = async () => {
      showLoader.value = true
      monsterParty.value = await getAccountParty();
      showLoader.value = false
    }

    const loadMonsterDetail = async (monsterId: string) => {
      showLoader.value = true
      selectedMonster.value = await getAccountMonsterDetail(monsterId);
      await delayAction(1000);
      showLoader.value = false;
    }

    const enableRemove = computed(() => {
      return monsterParty.value.length > 1
    });

    const onMonsterRemoval = () => {
      selectedMonster.value = undefined
      loadParty();
    }

    const onMonsterEvolution = async (id: string) => {
      selectedMonster.value = await getAccountMonsterDetail(id);
      reloadAccountCards();
      loadParty();
    }

    loadParty();

    return {
      monsterParty,
      showLoader,
      selectedMonster,
      loadMonsterDetail,
      onMonsterRemoval,
      enableRemove,
      faAnglesLeft,
      onMonsterEvolution
    }
  }
})

export default HomeModule;
</script>

<style lang="scss" scoped>
.home-module-wrapper {

  .account-monster-detail {
    margin-top: 20px;

    .back-button {
      font-size: 18px;
      cursor: pointer;
      filter: brightness(0.75);

      &:hover {
        filter: brightness(1);
      }
    }
  }
}
</style>