export class CardInventoryResponse {
  account: string;
  cards: ICard[]
}

interface ICard {
  monsterName: string;
  quantity: number;
}