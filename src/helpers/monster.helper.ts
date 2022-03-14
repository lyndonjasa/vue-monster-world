import useSpriteFactory from "@/hooks/useSpriteFactory";
import { DetailedMonsterResponse } from "@/http/responses/detailed-monster.response";
import { BattleMonster } from "@/models/monster/battle-monster";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { ElementEnum } from "@/models/skills/element.enum";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import { TargetEnum } from "@/models/skills/target.enum";

export const convertResponseToModel = (response: DetailedMonsterResponse[]): DetailedMonster[] => {
  const model: DetailedMonster[] = [];
  const responseSprites = response.map(r => r.sprite);
  const { sprites } = useSpriteFactory(responseSprites);

  const attackSkill: Skill = {
    cost: 0,
    name: 'Attack',
    power: 45,
    skillType: SkillTypeEnum.DAMAGE,
    ignoreDefense: false,
    skillTarget: TargetEnum.ENEMY,
    skillElement: ElementEnum.NON_ELEMENTAL
  }

  response.forEach(r => {
    const monster: DetailedMonster = {
      _id: r._id,
      currentExp: r.currentExp,
      element: r.element,
      expToLevel: r.expToLevel,
      level: r.level,
      name: r.name,
      computedName: r.computedName,
      sprite: sprites.find(s => s.name === r.sprite.name),
      stats: r.stats,
      talents: r.talents,
      talentPoints: r.talentPoints,
      skills: [
        { ...attackSkill },
        ...r.skills.map(s => {
          return {
            cost: s.cost,
            ignoreDefense: s.ignoreDefense,
            name: s.name,
            power: s.power,
            skillElement: s.skillElement,
            skillTarget: s.skillTarget,
            skillType: s.skillType,
            penalty: s.penalty,
            statusEffect: s.status
          }
        })
      ]
    }

    model.push(monster);
  })

  return model;
}

export const convertToModelForBattle = (model: DetailedMonster[], team: MonsterTeamEnum): BattleMonster[] => {
  return model.map(m => {
    return {
      ...m,
      team,
      appliedStatus: []
    }
  })
}

export const getMonsterThumbnail = (name: string) => {
  return require(`@/assets/thumbs/${name.replace(/\s+/g, '')}.jpg`);
}

export const descriptionDictionary: { name: string, description: string }[] = [
  {
    name: 'AeroVeedramon',
    description: `a Holy Dragon Digimon. Veedramon digivolved further, and as AeroVeedramon, 
      it became able to move through the sky. Among the rare species of Veedramon, it is said 
      that only veteran warriors that have come through frequent battles are able to digivolve, 
      so its existence is already becoming a legend.`
  },
  {
    name: 'Agumon',
    description: `a Reptile Digimon. It has grown up and become able to walk on two legs, and has an 
    appearance like a tiny dinosaur. Because it is still on the way to adulthood, its power is low, but as 
    its personality is quite ferocious, it doesn't understand fear.`
  },
  {
    name: 'Alphamon',
    description: `a Warrior Digimon and a carrier of the X-Antibody. While it is one of the "Royal Knights", 
    it is said that, to the Holy Knights, it is a being similar to a deterrent force, and as it doesn't appear 
    in normal times, it is also called the "Aloof Hermit" who flutters a blue mantle, and is the Royal Knight 
    assigned to the place called the "Empty Seat".`
  }
];