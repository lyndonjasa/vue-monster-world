import useSpriteFactory from "@/hooks/useSpriteFactory";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import { v4 as uuidv4 } from 'uuid';

const getMonsterParty = async (characterId: string): Promise<DetailedMonster[]> => {
  // character id will be supplied in the future

  console.log(characterId);
  const { sprites } = useSpriteFactory();
  monsterData.forEach(m => {
    m.sprite = sprites.find(s => s.name === m.name);
  })

  return await Promise.resolve(monsterData);
}

const getEnemyParty  = async (): Promise<DetailedMonster[]> => {
  // temporary code for getting enemy team

  const { sprites } = useSpriteFactory();
  enemyData.forEach(m => {
    m.sprite = sprites.find(s => s.name === m.name);
  })

  return await Promise.resolve(enemyData);
} 

export default { 
  getMonsterParty,
  getEnemyParty
}

const attackSkill: Skill = {
  cost: 0,
  name: 'Attack',
  power: 45,
  skillType: SkillTypeEnum.DAMAGE,
  ignoreDefense: false
}

const monsterData: DetailedMonster[] = [
  {
    name: 'Alphamon',
    stats: {
      health: 900,
      maxHealth: 900,
      mana: 79,
      maxMana: 79,
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
    sprite: undefined,
    skills: [
      { ...attackSkill },
      {
        name: 'Ultimate Ouryuken',
        cost: 50,
        power: 4,
        skillType: SkillTypeEnum.SIGNATURE,
        ignoreDefense: true
      }
    ]
  },
  {
    name: 'Agumon',
    stats: {
      health: 450,
      maxHealth: 450,
      mana: 20,
      maxMana: 20,
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
    sprite: undefined,
    skills: [
      { ...attackSkill }
    ]
  },
  {
    name: 'AeroVeedramon',
    stats: {
      health: 850,
      maxHealth: 850,
      mana: 50,
      maxMana: 50,
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
    sprite: undefined,
    skills: [
      { ...attackSkill }
    ]
  }
]

const enemyData: DetailedMonster[] = [
  {
    name: 'Alphamon',
    stats: {
      health: 900,
      maxHealth: 900,
      mana: 79,
      maxMana: 79,
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
    sprite: undefined,
    skills: [
      { ...attackSkill }
    ]
  },
  {
    name: 'Agumon',
    stats: {
      health: 450,
      maxHealth: 450,
      mana: 20,
      maxMana: 20,
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
    sprite: undefined,
    skills: [
      { ...attackSkill }
    ]
  },
  {
    name: 'AeroVeedramon',
    stats: {
      health: 850,
      maxHealth: 850,
      mana: 50,
      maxMana: 50,
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
    sprite: undefined,
    skills: [
      { ...attackSkill }
    ]
  }
]