import { ICard } from "@/http/responses/card-inventory.response";

export interface ICardInventoryState {
  cards: ICard[]
}

export const cardInventoryState: ICardInventoryState = {
  cards: []
}