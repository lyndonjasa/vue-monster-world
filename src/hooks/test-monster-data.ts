import { ElementEnum } from "@/models/element/element.enum";
import { Stats } from "@/models/monster/stats";
import { SkillDetail } from "@/models/skills/skill-detail";
import { SkillTargetEnum } from "@/models/skills/skill-target.enum";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";

export const testMonsterData: { name: string, stats: Stats, skills?: SkillDetail[] }[] = [
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
    skills: [
      {
        skill: {
          element: ElementEnum.NON_ELEMENTAL,
          cost: 0,
          description: "Basic attack",
          ignoreDefense: false,
          name: "Attack",
          power: 45,
          target: SkillTargetEnum.ENEMY,
          type: SkillTypeEnum.DAMAGE
        },
        status: undefined,
        penalty: undefined
      }
    ]
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
    skills: [
      {
        skill: {
          element: ElementEnum.NON_ELEMENTAL,
          cost: 0,
          description: "Basic attack",
          ignoreDefense: false,
          name: "Attack",
          power: 45,
          target: SkillTargetEnum.ENEMY,
          type: SkillTypeEnum.DAMAGE
        },
        status: undefined,
        penalty: undefined
      }
    ]
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
    skills: [
      {
        skill: {
          element: ElementEnum.NON_ELEMENTAL,
          cost: 0,
          description: "Basic attack",
          ignoreDefense: false,
          name: "Attack",
          power: 45,
          target: SkillTargetEnum.ENEMY,
          type: SkillTypeEnum.DAMAGE
        },
        status: undefined,
        penalty: undefined
      }
    ]
  }
]