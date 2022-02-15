import { GetterTree } from "vuex";
import { ITalent } from "./talent.interface";
import { TalentState } from "./talent.state";

export type TalentGetters = {
  talents(state: TalentState): ITalent[] 
}

export const talentGetters: GetterTree<TalentState, TalentState> & TalentGetters = {
  talents: (state: TalentState) => state.talents
}