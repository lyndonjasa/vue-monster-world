import { MutationTree } from "vuex";
import { ICoreState } from "./core.state";

export enum CoreMutationTypes {
  setUserId = 'SET_USER_ID',
  setAccountId = 'SET_ACCOUNT_ID',
  setUsername = 'SET_USERNAME',
  clearCoreState = 'CLEAR_STATE'
}

export type CoreMutations = {
  [CoreMutationTypes.setUserId](state: ICoreState, payload: string): void
  [CoreMutationTypes.setAccountId](state: ICoreState, payload: string): void
  [CoreMutationTypes.setUsername](state: ICoreState, payload: string): void
  [CoreMutationTypes.clearCoreState](state: ICoreState): void
}

export const coreMutations: MutationTree<ICoreState> & CoreMutations = {
  [CoreMutationTypes.setUserId](state: ICoreState, payload: string): void {
    state.userId = payload
  },
  [CoreMutationTypes.setAccountId](state: ICoreState, payload: string): void {
    state.accountId = payload
  },
  [CoreMutationTypes.setUsername](state: ICoreState, payload: string): void {
    state.username = payload
  },
  [CoreMutationTypes.clearCoreState](state: ICoreState): void {
    state.userId = '';
    state.accountId = '';
    state.username = '';
  }
}