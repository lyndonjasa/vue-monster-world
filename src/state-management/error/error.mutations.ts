import { IErrorState } from "./error.state";
import { MutationTree } from "vuex";

export enum ErrorMutationTypes {
  setErrorMessage = 'SET_ERROR_MESSAGE'
}

export type ErrorMutations = {
  [ErrorMutationTypes.setErrorMessage](state: IErrorState, payload: string): void
}

export const errorMutations: MutationTree<IErrorState> & ErrorMutations = {
  [ErrorMutationTypes.setErrorMessage]: (state: IErrorState, payload: string) => {
    state.errorMessage = payload
  }
}