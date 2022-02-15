import { ICard } from "@/http/responses/card-inventory.response";
import { MutationTree } from "vuex";
import { ICardInventoryState } from "./card-inventory.state";

export enum CardInventoryMutationTypes {
  setCards = 'SET_CARDS'
}

export interface CardInventoryMutations {
  [CardInventoryMutationTypes.setCards](state: ICardInventoryState, payload: ICard[])
}

export const cardInventoryMutations: MutationTree<ICardInventoryState> & CardInventoryMutations = {
  [CardInventoryMutationTypes.setCards]: (state: ICardInventoryState, payload: ICard[]) => {
    state.cards = payload.sort((a, b) => a.monsterName.localeCompare(b.monsterName));
  }
}