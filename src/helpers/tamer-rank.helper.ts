export interface ITamerRank {
  unlockedMonsters: number;
  rank: string;
}

export const ranks: ITamerRank[] = [
  {
    rank: 'In-Training Tamer',
    unlockedMonsters: 0
  },
  {
    rank: 'Apprentice Tamer',
    unlockedMonsters: 5
  },
  {
    rank: 'Bronze Tamer',
    unlockedMonsters: 10
  },
  {
    rank: 'Capable Tamer',
    unlockedMonsters: 15
  },
  {
    rank: 'Silver Tamer',
    unlockedMonsters: 20
  },
  {
    rank: 'Seasoned Tamer',
    unlockedMonsters: 25
  },
  {
    rank: 'Gold Tamer',
    unlockedMonsters: 30
  },
  {
    rank: 'Famed Tamer',
    unlockedMonsters: 35
  },
  {
    rank: 'Platinum Tamer',
    unlockedMonsters: 40
  },
  {
    rank: 'Great Tamer',
    unlockedMonsters: 45
  },
  {
    rank: 'Legendary Tamer',
    unlockedMonsters: 50
  },
];

export const getTamerRank = (unlockedMonsters: number): string => {
  let tamerRank: string;
  for (let index = 0; index < ranks.length; index++) {
    const rank = ranks[index];
    if (unlockedMonsters > rank.unlockedMonsters) {
      tamerRank = rank.rank;
    } else {
      break;
    }
  }

  return tamerRank;
}