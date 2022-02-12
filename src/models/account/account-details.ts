export class AccountDetails {
  _id: string;
  accountName: string;
  currency: number;
  unlockedMonsters: string[];
  party: MonsterParty[];
}

interface MonsterParty {
  level: number;
  monster: {
    name: string;
    element: number;
  }
}