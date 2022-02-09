import { ICoreState } from "./core.state";
import { GetterTree } from 'vuex'

export type CoreGetters = {
  userId(state: ICoreState): string,
  accountId(state: ICoreState): string
}

export const coreGetters: GetterTree<ICoreState, ICoreState> & CoreGetters = {
  userId: (state: ICoreState) => {
    return state.userId
  },
  accountId: (state: ICoreState) => {
    return state.accountId
  }
}