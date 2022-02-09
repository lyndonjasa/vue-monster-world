import { MutationTree } from "vuex";
import { ICoreState } from "./core.state";

export enum CoreMutationTypes {
  setUserId = 'SET_USER_ID',
  setAccountId = 'SET_ACCOUNT_ID'
}

export type CoreMutations = {
  [CoreMutationTypes.setUserId](state: ICoreState, payload: string): void
  [CoreMutationTypes.setAccountId](state: ICoreState, payload: string): void
}

export const coreMutations: MutationTree<ICoreState> & CoreMutations = {
  [CoreMutationTypes.setUserId](state: ICoreState, payload: string): void {
    state.userId = payload
  },
  [CoreMutationTypes.setAccountId](state: ICoreState, payload: string): void {
    state.accountId = payload
  }
}