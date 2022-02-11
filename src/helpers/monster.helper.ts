import useSpriteFactory from "@/hooks/useSpriteFactory";
import { DetailedMonsterResponse } from "@/http/responses/detailed-monster.response";
import { BattleMonster } from "@/models/monster/battle-monster";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";

export const convertResponseToModel = (response: DetailedMonsterResponse[]): DetailedMonster[] => {
  const model: DetailedMonster[] = [];
  const responseSprites = response.map(r => r.sprite);
  const { sprites } = useSpriteFactory(responseSprites);

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
      skills: r.skills.map(s => {
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