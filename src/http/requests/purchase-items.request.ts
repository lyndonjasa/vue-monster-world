export class PurchaseItemsRequest {
  accountId: string;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  itemId: string;
  quantity: number;
}