import { ICard } from "@/http/responses/card-inventory.response";
import { GetterTree } from "vuex";
import { ICardInventoryState } from "./card-inventory.state";

export type CardInventoryGetters = {
  cards(state: ICardInventoryState): ICard[]
}

export const cardInventoryGetters: GetterTree<ICardInventoryState, ICardInventoryState> & CardInventoryGetters = {
  cards: (state: ICardInventoryState) => state.cards
}