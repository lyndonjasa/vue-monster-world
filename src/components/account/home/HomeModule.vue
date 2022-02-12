<template>
  <base-div-loader v-if="showLoader"></base-div-loader>
  <div class="home-module-wrapper" v-else>
    Account Home Module
  </div>
</template>

<script lang="ts">
import { delayAction } from '@/helpers/delay.helper';
import useAccount from '@/hooks/http-hooks/useAccount';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { defineComponent, ref } from 'vue'

const HomeModule = defineComponent({
  setup() {
    const { getAccountParty } = useAccount();
    const monsterParty = ref<DetailedMonsterResponse[]>([]);
    const showLoader = ref<boolean>(false);

    const loadParty = async () => {
      showLoader.value = true
      monsterParty.value = await getAccountParty();
      await delayAction(1000);
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
