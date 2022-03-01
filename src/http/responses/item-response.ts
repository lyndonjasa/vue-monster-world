export class ItemResponse {
  tameRate?: ITameRate;
  _id: string;
  name: string;
  description: string;
  cost: number;
  type: string;
}

export interface ITameRate {
  rookie: number;
  champion: number;
  ultimate: number;
  mega: number;
  ultra: number;
}