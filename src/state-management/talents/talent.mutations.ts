import { MutationTree } from "vuex";
import { ITalent } from "./talent.interface";
import { TalentState } from "./talent.state";

export enum TalentMutationTypes {
  setTalents = 'SET_TALENTS'
}

export type TalentMutations = {
  [TalentMutationTypes.setTalents](state: TalentState, payload: ITalent[]);
}

export const talentMutations: MutationTree<TalentState> & TalentMutations = {
  [TalentMutationTypes.setTalents]: (state: TalentState, payload: ITalent[]) => {
    state.talents = payload;
  }
}