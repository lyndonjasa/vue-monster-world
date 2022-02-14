import { MutationTree } from "vuex";
import { IEvolution } from "./evolution.interface";
import { IEvolutionState } from "./evolution.state";

export enum EvolutionMutationTypes  {
  setEvolutions = 'SET_EVOLUTIONS'
}

export type EvolutionMutations = {
  [EvolutionMutationTypes.setEvolutions](state: IEvolutionState, payload: IEvolution[]): void
}

export const evolutionMutations: MutationTree<IEvolutionState> & EvolutionMutations = {
  [EvolutionMutationTypes.setEvolutions]: (state: IEvolutionState, payload: IEvolution[]) => {
    state.evolutions = payload;
  }
}