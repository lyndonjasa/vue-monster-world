import globalDataService from "@/services/global-data.service";
import { CardInventoryMutationTypes } from "@/state-management/card-inventory/card-inventory.mutations";
import { useCardInventoryStore } from "@/state-management/card-inventory/card-inventory.store";
import { EvolutionMutationTypes } from "@/state-management/evolution/evolution.mutations";
import { useEvolutionStore } from "@/state-management/evolution/evolution.store";
import { MonsterMutationTypes } from "@/state-management/monsters/monster.mutations";
import { useBaseMonsterStore } from "@/state-management/monsters/monster.store";
import { computed } from "vue";
import useAccount from "../http-hooks/useAccount";

const useGlobaData = () => {
  const evolutionStore = useEvolutionStore();
  const cardInventoryStore = useCardInventoryStore();
  const baseMonsterStore = useBaseMonsterStore();
  const { getAccountCards } = useAccount();

  const evolutions = computed(() => {
    return evolutionStore.getters.evolutions
  })

  const cards = computed(() => {
    return cardInventoryStore.getters.cards;
  })

  const baseMonsters = computed(() => {
    return baseMonsterStore.getters.baseMonsters;
  })

  const reloadAccountCards = async () => {
    const cardInventory = await getAccountCards();
    cardInventoryStore.commit(CardInventoryMutationTypes.setCards, cardInventory.cards);
  }

  const loadGlobalData = async () => {
    const evolutionData = await globalDataService.loadEvolutions();
    evolutionStore.commit(EvolutionMutationTypes.setEvolutions, evolutionData);

    const monsterData = await globalDataService.loadMonsters();
    baseMonsterStore.commit(MonsterMutationTypes.setMonsters, monsterData);

    reloadAccountCards();
  }

  return {
    evolutions,
    cards,
    baseMonsters,
    loadGlobalData,
    reloadAccountCards
  }
}

export default useGlobaData;