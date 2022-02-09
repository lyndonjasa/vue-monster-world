import { CommitOptions, createStore, Store } from "vuex";
import { CoreGetters, coreGetters } from "./core.getters";
import { CoreMutations, coreMutations } from "./core.mutations";
import { coreState, ICoreState } from "./core.state";

export const coreStore = createStore({
  state: coreState,
  getters: coreGetters,
  mutations: coreMutations
})

export type CoreStore = Omit<
  Store<ICoreState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof CoreMutations, P extends Parameters<CoreMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<CoreMutations[K]>
} & {
  getters: {
    [K in keyof CoreGetters]: ReturnType<CoreGetters[K]>
  }
}

export function useCoreStore() {
  return coreStore as CoreStore
}