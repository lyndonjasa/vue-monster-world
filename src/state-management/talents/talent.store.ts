import { CommitOptions, createStore, Store } from "vuex";
import { TalentGetters, talentGetters } from "./talent.getters";
import { TalentMutations, talentMutations } from "./talent.mutations";
import { TalentState, talentState } from "./talent.state";

export const talentStore = createStore({
  getters: talentGetters,
  mutations: talentMutations,
  state: talentState
})

export type TalentStore = Omit<
  Store<TalentState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof TalentMutations, P extends Parameters<TalentMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<TalentMutations[K]>
} & {
  getters: {
    [K in keyof TalentGetters]: ReturnType<TalentGetters[K]>
  }
}

export function useTalentStore() {
  return talentStore as TalentStore
}