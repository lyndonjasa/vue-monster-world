import { Stats } from "@/models/monster/stats";

export const testMonsterData: { name: string, stats: Stats }[] = [
  {
    name: 'Alphamon',
    stats: {
      health: 900,
      mana: 79,
      offense: 105,
      defense: 120,
      speed: 91,
      critRate: 10.5,
      critDamage: 200,
      healthRegen: 10,
      manaRegen: 10
    }
  },
  {
    name: 'Agumon',
    stats: {
      health: 450,
      mana: 20,
      offense: 68,
      defense: 45,
      speed: 37,
      critRate: 1.5,
      critDamage: 200,
      healthRegen: 10,
      manaRegen: 10
    }
  },
  {
    name: 'AeroVeedramon',
    stats: {
      health: 850,
      mana: 50,
      offense: 100,
      defense: 55,
      speed: 95,
      critRate: 5.5,
      critDamage: 200,
      healthRegen: 10,
      manaRegen: 10
    }
  }
]