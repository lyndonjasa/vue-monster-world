import { MutationTree } from "vuex";
import { ILoaderState } from "./loader.state";

export enum LoaderMutationTypes {
  setModalLoader = 'SET_MODAL_LOADER',
  setScreenLoader = 'SET_SCREEN_LOADER'
}

export type LoaderMutations = {
  [LoaderMutationTypes.setModalLoader](state: ILoaderState, payload: boolean): void
  [LoaderMutationTypes.setScreenLoader](state: ILoaderState, payload: boolean): void
}

export const loaderMutations: MutationTree<ILoaderState> & LoaderMutations = {
  [LoaderMutationTypes.setModalLoader](state: ILoaderState, payload: boolean): void {
    state.showModalLoader = payload
  },
  [LoaderMutationTypes.setScreenLoader](state: ILoaderState, payload: boolean): void {
    state.showScreenLoader = payload
  }
} 