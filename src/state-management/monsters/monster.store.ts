import { CommitOptions, createStore, Store } from "vuex";
import { MonsterGetters, monsterGetters } from "./monster.getters";
import { MonsterMutations, monsterMutations } from "./monster.mutations";
import { MonsterState, monsterState } from "./monster.state";

export const baseMonsterStore = createStore({
  getters: monsterGetters,
  mutations: monsterMutations,
  state: monsterState
})

export type BaseMonsterStore = Omit<
  Store<MonsterState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof MonsterMutations, P extends Parameters<MonsterMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<MonsterMutations[K]>
} & {
  getters: {
    [K in keyof MonsterGetters]: ReturnType<MonsterGetters[K]>
  }
}

export function useBaseMonsterStore() {
  return baseMonsterStore as BaseMonsterStore
}