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

  const username = computed({
    get(): string {
      return store.getters.username
    },
    set(value: string) {
      store.commit(CoreMutationTypes.setUsername, value)
    }
  })

  const clearState = () => {
    store.commit(CoreMutationTypes.clearCoreState, undefined);
  }

  return {
    userId,
    accountId,
    username,
    clearState
  }
}

export default useAppStateCore;