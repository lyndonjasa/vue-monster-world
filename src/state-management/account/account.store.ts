import { CommitOptions, createStore, Store } from "vuex";
import { AccountGetters, accountGetters } from "./account.getters";
import { AccountMutations, accountMutations } from "./account.mutations";
import { AccountState, accountState } from "./account.state";

export const accountStore = createStore({
  state: accountState,
  getters: accountGetters,
  mutations: accountMutations
})

export type AccountStore = Omit<
  Store<AccountState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof AccountMutations, P extends Parameters<AccountMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<AccountMutations[K]>
} & {
  getters: {
    [K in keyof AccountGetters]: ReturnType<AccountGetters[K]>
  }
}

export function useAccountStore() {
  return accountStore as AccountStore
}