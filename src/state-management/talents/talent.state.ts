import { ITalent } from "./talent.interface";

export interface TalentState {
  talents: ITalent[]
}

export const talentState: TalentState = {
  talents: []
}