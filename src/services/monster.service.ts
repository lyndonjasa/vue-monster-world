import useSpriteFactory from "@/hooks/useSpriteFactory";
import { BuffInstanceEnum } from "@/models/battle/buff-instance.enum";
import { BuffEnum } from "@/models/battle/buff.enum";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { ElementEnum } from "@/models/skills/element.enum";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import { TargetEnum } from "@/models/skills/target.enum";
import { TalentEnum } from "@/models/talents/talent.enum";
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
  ignoreDefense: false,
  skillTarget: TargetEnum.ENEMY,
  skillElement: ElementEnum.NON_ELEMENTAL
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
      manaRegen: 10,
    },
    appliedStatus: [],
    element: ElementEnum.ROCK,
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
        ignoreDefense: true,
        skillTarget: TargetEnum.ENEMY,
        skillElement: ElementEnum.NON_ELEMENTAL
      }
    ],
    talents: []
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
    appliedStatus: [],
    element: ElementEnum.FIRE,
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined,
    skills: [
      { ...attackSkill },
      {
        cost: 5,
        power: 70,
        ignoreDefense: false,
        name: 'Pepper Breath',
        skillElement: ElementEnum.FIRE,
        skillTarget: TargetEnum.ENEMY,
        skillType: SkillTypeEnum.SIGNATURE
      },
      {
        cost: 3,
        power: 55,
        ignoreDefense: false,
        name: 'Burst Flame',
        skillElement: ElementEnum.FIRE,
        skillTarget: TargetEnum.ENEMY,
        skillType: SkillTypeEnum.DAMAGE
      }
    ],
    talents: []
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
    appliedStatus: [],
    element: ElementEnum.WIND,
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined,
    skills: [
      { ...attackSkill },
      {
        name: 'Dragon Impulse',
        cost: 15,
        power: 250,
        ignoreDefense: false,
        skillElement: ElementEnum.WIND,
        skillTarget: TargetEnum.ENEMY,
        skillType: SkillTypeEnum.DAMAGE,
        penalty: {
          damagePercentage: 50,
          target: TargetEnum.SELF
        }
      },
      {
        cost: 5,
        ignoreDefense: false,
        name: 'Test Heal',
        power: 10,
        skillElement: ElementEnum.NON_ELEMENTAL,
        skillTarget: TargetEnum.ALLY,
        skillType: SkillTypeEnum.HEAL
      }
    ],
    talents: [
      TalentEnum.VAMPIRISM
    ]
  }
]

const enemyData: DetailedMonster[] = [
  {
    name: 'Gallantmon',
    stats: {
      health: 950,
      maxHealth: 950,
      mana: 95,
      maxMana: 95,
      offense: 100,
      defense: 105,
      speed: 91,
      critRate: 10,
      critDamage: 200,
      healthRegen: 10,
      manaRegen: 10
    },
    appliedStatus: [],
    element: ElementEnum.FIRE,
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined,
    skills: [
      { ...attackSkill },
      {
        name: 'Royal Saber',
        cost: 15,
        power: 60,
        skillType: SkillTypeEnum.DAMAGE,
        ignoreDefense: false,
        skillTarget: TargetEnum.ENEMY,
        skillElement: ElementEnum.NON_ELEMENTAL,
        statusEffect: {
          buff: BuffEnum.COUNTER,
          chance: 100,
          duration: 3,
          statusInstance: BuffInstanceEnum.PER_INSTANCE,
          target: TargetEnum.SELF
        }
      },
      {
        name: 'Final Elysion',
        cost: 25,
        ignoreDefense: false,
        power: 115,
        skillElement: ElementEnum.NON_ELEMENTAL,
        skillTarget: TargetEnum.ENEMY,
        skillType: SkillTypeEnum.SIGNATURE,
        statusEffect: {
          buff: BuffEnum.AGGRO,
          chance: 100,
          duration: 2,
          statusInstance: BuffInstanceEnum.PER_TURN,
          target: TargetEnum.SELF
        }
      }
    ],
    talents: []
  },
  {
    name: 'Mugendramon',
    stats: {
      health: 750,
      maxHealth: 750,
      mana: 65,
      maxMana: 65,
      offense: 120,
      defense: 120,
      speed: 85,
      critRate: 7.5,
      critDamage: 200,
      healthRegen: 10,
      manaRegen: 10
    },
    appliedStatus: [],
    element: ElementEnum.ELECTRIC,
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined,
    skills: [
      { ...attackSkill },
      {
        cost: 50,
        ignoreDefense: false,
        name: 'Infinity Cannon',
        power: 115,
        skillElement: ElementEnum.ELECTRIC,
        skillTarget: TargetEnum.ALL_ENEMIES,
        skillType: SkillTypeEnum.SIGNATURE,
        statusEffect: {
          buff: BuffEnum.STATIC,
          chance: 70,
          duration: 2,
          statusInstance: BuffInstanceEnum.PER_TURN,
          target: TargetEnum.ALL_ENEMIES
        }
      },
      {
        cost: 35,
        ignoreDefense: true,
        name: 'Destroyed Hook',
        power: 3,
        skillElement: ElementEnum.NON_ELEMENTAL,
        skillTarget: TargetEnum.ENEMY,
        skillType: SkillTypeEnum.DAMAGE
      }
    ],
    talents: []
  },
  {
    name: 'Jesmon',
    stats: {
      health: 900,
      maxHealth: 900,
      mana: 75,
      maxMana: 75,
      offense: 135,
      defense: 105,
      speed: 110,
      critRate: 7.5,
      critDamage: 200,
      healthRegen: 10,
      manaRegen: 10
    },
    appliedStatus: [],
    element: ElementEnum.ELECTRIC,
    _id: uuidv4(),
    currentExp: 0,
    expToLevel: 100,
    level: 1,
    sprite: undefined,
    skills: [
      { ...attackSkill },
      {
        cost: 15,
        ignoreDefense: false,
        name: 'Weltgeist',
        power: 0,
        skillElement: ElementEnum.NON_ELEMENTAL,
        skillTarget: TargetEnum.SELF,
        skillType: SkillTypeEnum.BUFF,
        statusEffect: {
          buff: BuffEnum.WELTGEIST,
          chance: 100,
          duration: 2,
          statusInstance: BuffInstanceEnum.PER_TURN,
          target: TargetEnum.SELF
        }
      },
      {
        cost: 30,
        ignoreDefense: false,
        name: 'One For All',
        power: 150,
        skillElement: ElementEnum.ELECTRIC,
        skillTarget: TargetEnum.ENEMY,
        skillType: SkillTypeEnum.SIGNATURE,
        statusEffect: {
          buff: BuffEnum.STATIC,
          chance: 35,
          duration: 2,
          statusInstance: BuffInstanceEnum.PER_TURN,
          target: TargetEnum.ENEMY
        }
      }
    ],
    talents: [
      TalentEnum.WRATH
    ]
  }
]