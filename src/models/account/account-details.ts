export class AccountDetails {
  _id: string;
  accountName: string;
  currency: number;
  unlockedMonsters: string[];
  party: MonsterParty[];
}

export interface MonsterParty {
  _id: string;
  level: number;
  monster: {
    name: string;
    element: number;
  }
  cardBonus: number;
}