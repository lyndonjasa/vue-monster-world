export class AccountDetails {
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