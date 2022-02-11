import { CoreMutationTypes } from "@/state-management/core/core.mutations";
import { useCoreStore } from "@/state-management/core/core.store"
import { computed } from "vue";
import useSession from "../app-hooks/useSession";

const useAppStateCore = () => {
  const store = useCoreStore();
  const session = useSession();

  const setStoreValues = () => {
    // set user id from session
    if (!userId.value && session.sessionUserId.value) {
      userId.value = session.sessionUserId.value
    }

    // set username from session
    if (!username.value && session.sessionUsername.value) {
      username.value = session.sessionUsername.value
    }

    // set accountId from session
    if (!accountId.value && session.sessionAccountId.value) {
      accountId.value = session.sessionAccountId.value
    }
  }

  const userId = computed({
    get(): string {
      return store.getters.userId
    },
    set(value: string) {
      store.commit(CoreMutationTypes.setUserId, value)
      session.sessionUserId.value = value;
    }
  })

  const accountId = computed({
    get(): string {
      return store.getters.accountId
    },
    set(value: string) {
      store.commit(CoreMutationTypes.setAccountId, value)
      session.sessionAccountId.value = value;
    }
  })

  const username = computed({
    get(): string {
      return store.getters.username
    },
    set(value: string) {
      store.commit(CoreMutationTypes.setUsername, value)
      session.sessionUsername.value = value;
    }
  })

  const clearState = () => {
    store.commit(CoreMutationTypes.clearCoreState, undefined);
    session.clearSession();
  }

  return {
    userId,
    accountId,
    username,
    clearState,
    setStoreValues
  }
}

export default useAppStateCore;