import { IEvolutionState } from "./evolution.state";
import { IEvolution } from './evolution.interface'
import { GetterTree } from "vuex";

export type EvolutionGetters = {
  evolutions(state: IEvolutionState): IEvolution[];
}

export const evolutionGetters: GetterTree<IEvolutionState, IEvolutionState> & EvolutionGetters = {
  evolutions: (state: IEvolutionState) => state.evolutions
}