import globalDataService from "@/services/global-data.service";
import { AccountMutationTypes } from "@/state-management/account/account.mutations";
import { useAccountStore } from "@/state-management/account/account.store";
import { CardInventoryMutationTypes } from "@/state-management/card-inventory/card-inventory.mutations";
import { useCardInventoryStore } from "@/state-management/card-inventory/card-inventory.store";
import { EvolutionMutationTypes } from "@/state-management/evolution/evolution.mutations";
import { useEvolutionStore } from "@/state-management/evolution/evolution.store";
import { MonsterMutationTypes } from "@/state-management/monsters/monster.mutations";
import { useBaseMonsterStore } from "@/state-management/monsters/monster.store";
import { TalentMutationTypes } from "@/state-management/talents/talent.mutations";
import { useTalentStore } from "@/state-management/talents/talent.store";
import { computed } from "vue";
import useAccount from "../http-hooks/useAccount";

const useGlobaData = () => {
  const evolutionStore = useEvolutionStore();
  const cardInventoryStore = useCardInventoryStore();
  const baseMonsterStore = useBaseMonsterStore();
  const accountStore = useAccountStore();
  const talentStore = useTalentStore();
  const { getAccountCards, getAccountDetails } = useAccount();

  const evolutions = computed(() => {
    return evolutionStore.getters.evolutions
  })

  const cards = computed(() => {
    return cardInventoryStore.getters.cards;
  })

  const accountDetails = computed(() => {
    return accountStore.getters.account;
  })

  const baseMonsters = computed(() => {
    return baseMonsterStore.getters.baseMonsters;
  })

  const talents = computed(() => {
    return talentStore.getters.talents;
  })

  const reloadAccount = async () => {
    const accountDetails = await getAccountDetails();
    accountStore.commit(AccountMutationTypes.setAccountDetails, accountDetails);
  }

  const reloadAccountCards = async () => {
    const cardInventory = await getAccountCards();
    cardInventoryStore.commit(CardInventoryMutationTypes.setCards, cardInventory.cards);
  }

  const loadGlobalData = async () => {
    const [evolutionData, monsterData, talentData] = await Promise.all([
      globalDataService.loadEvolutions(),
      globalDataService.loadMonsters(),
      globalDataService.loadTalents()
    ])

    evolutionStore.commit(EvolutionMutationTypes.setEvolutions, evolutionData);
    baseMonsterStore.commit(MonsterMutationTypes.setMonsters, monsterData);
    talentStore.commit(TalentMutationTypes.setTalents, talentData)

    await reloadAccountCards();
    await reloadAccount();
  }

  return {
    evolutions,
    cards,
    baseMonsters,
    accountDetails,
    loadGlobalData,
    reloadAccountCards,
    reloadAccount
  }
}

export default useGlobaData;