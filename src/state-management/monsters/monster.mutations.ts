import { MutationTree } from "vuex";
import { IBaseMonster } from "./base-monster.interface";
import { MonsterState } from "./monster.state";

export enum MonsterMutationTypes {
  setMonsters = 'SET_MONSTERS'
}

export type MonsterMutations = {
  [MonsterMutationTypes.setMonsters](state: MonsterState, payload: IBaseMonster[]): void
}

export const monsterMutations: MutationTree<MonsterState> & MonsterMutations = {
  [MonsterMutationTypes.setMonsters]: (state: MonsterState, payload: IBaseMonster[]) => {
    state.baseMonsters = payload
  }
}