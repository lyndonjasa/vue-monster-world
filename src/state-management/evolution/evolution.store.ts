import { CommitOptions, createStore, Store } from "vuex";
import { EvolutionGetters, evolutionGetters } from "./evolution.getters";
import { EvolutionMutations, evolutionMutations } from "./evolution.mutations";
import { evolutionState, IEvolutionState } from "./evolution.state";

export const evolutionStore = createStore({
  getters: evolutionGetters,
  mutations: evolutionMutations,
  state: evolutionState
})

export type EvolutionStore = Omit<
  Store<IEvolutionState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof EvolutionMutations, P extends Parameters<EvolutionMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<EvolutionMutations[K]>
} & {
  getters: {
    [K in keyof EvolutionGetters]: ReturnType<EvolutionGetters[K]>
  }
}

export function useEvolutionStore() {
  return evolutionStore as EvolutionStore
}