import { DetailedMonster } from "@/models/monster/detailed-monster"
import MonsterService from "@/services/monster.service"

interface Factory {
  getMonsterParty(): Promise<DetailedMonster[]>,
  getEnemyParty(): Promise<DetailedMonster[]>
}

const useMonsterFactory = (): Factory => {

  const getMonsterParty = (): Promise<DetailedMonster[]> => {
    return MonsterService.getMonsterParty('test id');
  }

  const getEnemyParty = (): Promise<DetailedMonster[]> => {
    return MonsterService.getEnemyParty();
  }

  return {
    getMonsterParty,
    getEnemyParty
  }
}

export default useMonsterFactory;