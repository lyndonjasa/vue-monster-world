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
        :showEvolve="canEvolve"
        :showCard="false"
        :showRemove="enableRemove">
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

const HomeModule = defineComponent({
  components: {
    AccountMonsterDetails
  },
  setup() {
    const { getAccountParty, getAccountMonsterDetail } = useAccount();
    const monsterParty = ref<DetailedMonsterResponse[]>([]);
    const selectedMonster = ref<DetailedMonsterResponse>(undefined);

    const showLoader = ref<boolean>(false);

    const loadParty = async () => {
      showLoader.value = true
      monsterParty.value = await getAccountParty();
      showLoader.value = false
    }

    const canEvolve = computed(() => {
      if (!selectedMonster.value) return false

      const allowedEvolutions = ['Rookie', 'Champion', 'Ultimate'];
      return allowedEvolutions.includes(selectedMonster.value.stage);
    })

    const loadMonsterDetail = async (monsterId: string) => {
      showLoader.value = true
      selectedMonster.value = await getAccountMonsterDetail(monsterId);
      console.log(selectedMonster.value);
      await delayAction(1000);
      showLoader.value = false;
    }

    const enableRemove = computed(() => {
      return monsterParty.value.length > 1
    });

    loadParty();

    return {
      monsterParty,
      showLoader,
      selectedMonster,
      loadMonsterDetail,
      enableRemove,
      canEvolve,
      faAnglesLeft
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