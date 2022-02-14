import { IEvolution } from "./evolution.interface";

export interface IEvolutionState {
  evolutions: IEvolution[]
}

export const evolutionState: IEvolutionState = {
  evolutions: []
}