import useSpriteFactory from "@/hooks/useSpriteFactory";
import { OwnedMonster } from "@/models/monster/owned-monster";
import { v4 as uuidv4 } from 'uuid';

const getMonsterParty = async (characterId: string): Promise<OwnedMonster[]> => {
  // character id will be supplied in the future

  console.log(characterId);
  const { sprites } = useSpriteFactory();
  monsterData.forEach(m => {
    m.sprite = sprites.find(s => s.name === m.name);
  })

  return await Promise.resolve(monsterData);
}

export default { getMonsterParty }

const monsterData: OwnedMonster[] = [
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
    },
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined
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
    },
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined
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
    },
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined
  }
]