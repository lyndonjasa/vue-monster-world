export class CardInventoryResponse {
  account: string;
  cards: ICard[]
}

export interface ICard {
  monsterName: string;
  quantity: number;
  cardDisplayName?: string;
}