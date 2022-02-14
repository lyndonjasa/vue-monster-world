import { CommitOptions, createStore, Store } from "vuex";
import { ErrorGetters, errorGetters } from "./error.getters";
import { ErrorMutations, errorMutations } from "./error.mutations";
import { errorState, IErrorState } from "./error.state";

export const errorStore = createStore({
  getters: errorGetters,
  mutations: errorMutations,
  state: errorState
})

export type ErrorStore = Omit<
  Store<IErrorState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof ErrorMutations, P extends Parameters<ErrorMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<ErrorMutations[K]>
} & {
  getters: {
    [K in keyof ErrorGetters]: ReturnType<ErrorGetters[K]>
  }
}

export function useErrorStore() {
  return errorStore as ErrorStore
}