import globalDataService from "@/services/global-data.service";
import { EvolutionMutationTypes } from "@/state-management/evolution/evolution.mutations";
import { useEvolutionStore } from "@/state-management/evolution/evolution.store";
import { computed } from "vue";

const useGlobaData = () => {
  const evolutionStore = useEvolutionStore();

  const evolutions = computed(() => {
    return evolutionStore.getters.evolutions
  })

  const loadGlobalData = async () => {
    const evolutionData = await globalDataService.loadEvolutions();
    evolutionStore.commit(EvolutionMutationTypes.setEvolutions, evolutionData);
  }

  return {
    evolutions,
    loadGlobalData
  }
}

export default useGlobaData;