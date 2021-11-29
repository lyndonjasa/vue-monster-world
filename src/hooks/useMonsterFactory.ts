import { Monster } from "@/models/monster/monster"
import { Stats } from "@/models/monster/stats"
import { SkillDetail } from "@/models/skills/skill-detail"
import { Sprite } from "@/models/sprites/sprite"

interface Factory {
  createMonster(name: string,
    stats: Stats,
    sprite: Sprite,
    skills?: SkillDetail[]): Monster
}

const useMonsterFactory = (): Factory => {

  const createMonster = (name: string,
    stats: Stats,
    sprite: Sprite,
    skills?: SkillDetail[]): Monster => {
    const monster: Monster = {
      name,
      stats,
      sprite,
      skills
    };

    return monster
  }

  return {
    createMonster
  }
}

export default useMonsterFactory;