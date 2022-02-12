<template>
  <base-div-loader v-if="showLoader"></base-div-loader>
  <div class="home-module-wrapper" v-else>
    <account-monster-details v-for="monster in monsterParty" 
      :key="monster._id"
      :monster="monster">
    </account-monster-details>
  </div>
</template>

<script lang="ts">
import useAccount from '@/hooks/http-hooks/useAccount';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { defineComponent, ref } from 'vue'
import AccountMonsterDetails from '../monsters/AccountMonsterDetails.vue';

const HomeModule = defineComponent({
  components: {
    AccountMonsterDetails
  },
  setup() {
    const { getAccountParty } = useAccount();
    const monsterParty = ref<DetailedMonsterResponse[]>([]);
    const showLoader = ref<boolean>(false);

    const loadParty = async () => {
      showLoader.value = true
      monsterParty.value = await getAccountParty();
      // await delayAction(1000);
      showLoader.value = false
    }

    loadParty();

    return {
      monsterParty,
      showLoader
    }
  }
})

export default HomeModule;
</script>
