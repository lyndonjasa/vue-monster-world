import { CoreMutationTypes } from "@/state-management/core/core.mutations";
import { useCoreStore } from "@/state-management/core/core.store"
import { computed } from "vue";

const useAppStateCore = () => {
  const store = useCoreStore();

  // TODO: add pushing to sessions

  const userId = computed({
    get(): string {
      return store.getters.userId
    },
    set(value: string) {
      store.commit(CoreMutationTypes.setUserId, value)
    }
  })

  const accountId = computed({
    get(): string {
      return store.getters.accountId
    },
    set(value: string) {
      store.commit(CoreMutationTypes.setAccountId, value)
    }
  })

  return {
    userId,
    accountId
  }
}

export default useAppStateCore;