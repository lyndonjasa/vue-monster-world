import { CommitOptions, createStore, Store } from "vuex";
import { LoaderGetters, loaderGetters } from "./loader.getters";
import { LoaderMutations, loaderMutations } from "./loader.mutations";
import { ILoaderState, loaderState } from "./loader.state";

export const loaderStore = createStore({
  getters: loaderGetters,
  mutations: loaderMutations,
  state: loaderState
})

export type LoaderStore = Omit<
  Store<ILoaderState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof LoaderMutations, P extends Parameters<LoaderMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<LoaderMutations[K]>
} & {
  getters: {
    [K in keyof LoaderGetters]: ReturnType<LoaderGetters[K]>
  }
}

export function useLoaderStore() {
  return loaderStore as LoaderStore
}