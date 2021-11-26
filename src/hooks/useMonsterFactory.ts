import { Monster } from "@/models/monster/monster"
import { Stats } from "@/models/monster/stats"
import { Sprite } from "@/models/sprites/sprite"

interface Factory {
  createMonster(name: string,
    stats: Stats,
    sprite: Sprite): Monster
}

const useMonsterFactory = (): Factory => {

  const createMonster = (name: string,
    stats: Stats,
    sprite: Sprite): Monster => {
    const monster = new Monster(name, stats, sprite);

    return monster
  }

  return {
    createMonster
  }
}

export default useMonsterFactory;