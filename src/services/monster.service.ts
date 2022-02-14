import { spriteData } from "@/hooks/test-sprite-data";
import useEnvironment from "@/hooks/useEnvironment";
import useSpriteFactory from "@/hooks/useSpriteFactory";
import { SearchMonsterRequest } from "@/http/requests/search-monster.request";
import { StarterPackResponse } from "@/http/responses";
import { DetailedMonsterResponse } from "@/http/responses/detailed-monster.response";
import { BuffInstanceEnum } from "@/models/battle/buff-instance.enum";
import { BuffEnum } from "@/models/battle/buff.enum";
import { BattleMonster } from "@/models/monster/battle-monster";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { ElementEnum } from "@/models/skills/element.enum";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import { TargetEnum } from "@/models/skills/target.enum";
import { TalentEnum } from "@/models/talents/talent.enum";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const { apiBaseUrl } = useEnvironment();
const baseMonsterRoute = `${apiBaseUrl}/monsters`
const baseAccountRoute = `${apiBaseUrl}/accounts`

const getStarterPacks = (): Promise<StarterPackResponse[]> => {
  return axios.get(`${baseMonsterRoute}/starters`).then(r => r.data)
}

const getAccountMonsterParty = (accountId: string): Promise<DetailedMonsterResponse[]> => {
  return axios.get(`${baseAccountRoute}/${accountId}/party`).then(r => r.data)
}

const getAccountMonster = (accountId: string, monsterId: string): Promise<DetailedMonsterResponse> => {
  return axios.get(`${baseAccountRoute}/${accountId}/monsters/${monsterId}`).then(r => r.data)
}

const searchAccountMonsters = (accountId: string, request: SearchMonsterRequest): Promise<{ totalCount: number, monsters: DetailedMonsterResponse[]}> => {
  return axios.post(`${baseAccountRoute}/${accountId}/monsters`, request).then(r => r.data);
}

const updateMonsterParty = (accountId: string, monsterIds: string[]): Promise<void> => {
  return axios.put(`${baseAccountRoute}/${accountId}/party`, monsterIds).then(r => r.data);
}

const evolveMonster = (accountId: string, monsterId: string): Promise<void> => {
  return axios.put(`${baseAccountRoute}/${accountId}/monsters/${monsterId}/evolve`).then(r => r.data);
}

const getMonsterParty = async (characterId: string): Promise<BattleMonster[]> => {
  // character id will be supplied in the future

  console.log(characterId);
  const { sprites } = useSpriteFactory(spriteData);
  monsterData.forEach(m => {
    m.sprite = sprites.find(s => s.name === m.name);
  })

  console.log(monsterData);

  return await Promise.resolve(monsterData);
}

const getEnemyParty = async (): Promise<BattleMonster[]> => {
  // temporary code for getting enemy team

  const { sprites } = useSpriteFactory(spriteData);
  enemyData.forEach(m => {
    m.sprite = sprites.find(s => s.name === m.name);
  })

  return await Promise.resolve(enemyData);
} 

export default { 
  getMonsterParty,
  getEnemyParty,
  getStarterPacks,
  getAccountMonsterParty,
  getAccountMonster,
  searchAccountMonsters,
  updateMonsterParty,
  evolveMonster
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

const monsterData: BattleMonster[] = [
  {
    name: 'Alphamon',
    computedName: 'Alphamon',
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
    team: MonsterTeamEnum.LEFT,
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
    talents: [
      TalentEnum.UNDYING,
      TalentEnum.GUARD,
      TalentEnum.PRIDE,
      TalentEnum.RETALIATION
    ],
    talentPoints: 0
  },
  {
    name: 'Agumon',
    computedName: 'Alphamon',
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
    team: MonsterTeamEnum.LEFT,
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
    talents: [],
    talentPoints: 0
  },
  {
    name: 'AeroVeedramon',
    computedName: 'Alphamon',
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
    team: MonsterTeamEnum.LEFT,
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
      TalentEnum.VAMPIRISM,
      TalentEnum.EFFICIENCY,
      TalentEnum.LETHARGY,
      TalentEnum.LIGHT_FOOTED,
      TalentEnum.INTRUDER
    ],
    talentPoints: 0
  }
]

const enemyData: BattleMonster[] = [
  {
    name: 'Gallantmon',
    computedName: 'Alphamon',
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
    team: MonsterTeamEnum.RIGHT,
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
    talents: [
      TalentEnum.RETALIATION
    ],
    talentPoints: 0
  },
  {
    name: 'Mugendramon',
    computedName: 'Alphamon',
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
    team: MonsterTeamEnum.RIGHT,
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
          target: TargetEnum.OTHERS
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
    talents: [],
    talentPoints: 0
  },
  {
    name: 'Jesmon',
    computedName: 'Alphamon',
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
    team: MonsterTeamEnum.RIGHT,
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
          chance: 85,
          duration: 2,
          statusInstance: BuffInstanceEnum.PER_TURN,
          target: TargetEnum.OTHERS
        }
      }
    ],
    talents: [
      TalentEnum.WRATH,
      TalentEnum.ACCURACY
    ],
    talentPoints: 0
  }
]