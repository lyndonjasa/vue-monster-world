import globalDataService from "@/services/global-data.service";
import { CardInventoryMutationTypes } from "@/state-management/card-inventory/card-inventory.mutations";
import { useCardInventoryStore } from "@/state-management/card-inventory/card-inventory.store";
import { EvolutionMutationTypes } from "@/state-management/evolution/evolution.mutations";
import { useEvolutionStore } from "@/state-management/evolution/evolution.store";
import { computed } from "vue";
import useAccount from "../http-hooks/useAccount";

const useGlobaData = () => {
  const evolutionStore = useEvolutionStore();
  const cardInventoryStore = useCardInventoryStore();
  const { getAccountCards } = useAccount();

  const evolutions = computed(() => {
    return evolutionStore.getters.evolutions
  })

  const cards = computed(() => {
    return cardInventoryStore.getters.cards;
  })

  const reloadAccountCards = async () => {
    const cardInventory = await getAccountCards();
    cardInventoryStore.commit(CardInventoryMutationTypes.setCards, cardInventory.cards);
  }

  const loadGlobalData = async () => {
    const evolutionData = await globalDataService.loadEvolutions();
    evolutionStore.commit(EvolutionMutationTypes.setEvolutions, evolutionData);

    reloadAccountCards();
  }

  return {
    evolutions,
    cards,
    loadGlobalData,
    reloadAccountCards
  }
}

export default useGlobaData;