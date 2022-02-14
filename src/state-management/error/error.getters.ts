import { GetterTree } from "vuex";
import { IErrorState } from "./error.state";

export type ErrorGetters = {
  error(state: IErrorState): string;
}

export const errorGetters: GetterTree<IErrorState, IErrorState> & ErrorGetters = {
  error: (state: IErrorState) => state.errorMessage
}