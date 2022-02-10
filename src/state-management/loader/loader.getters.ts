import { GetterTree } from "vuex";
import { ILoaderState } from "./loader.state";

export type LoaderGetters = {
  showModalLoader(state: ILoaderState): boolean,
  showScreenLoader(state: ILoaderState): boolean
}

export const loaderGetters: GetterTree<ILoaderState, ILoaderState> & LoaderGetters = {
  showModalLoader: (state: ILoaderState) => state.showModalLoader,
  showScreenLoader: (state: ILoaderState) => state.showScreenLoader
}