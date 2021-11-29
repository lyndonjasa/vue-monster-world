import { OwnedMonster } from "@/models/monster/owned-monster"
import MonsterService from "@/services/monster.service"

interface Factory {
  getMonsterParty(): Promise<OwnedMonster[]>,
  getEnemyParty(): Promise<OwnedMonster[]>
}

const useMonsterFactory = (): Factory => {

  const getMonsterParty = (): Promise<OwnedMonster[]> => {
    return MonsterService.getMonsterParty('test id');
  }

  const getEnemyParty = (): Promise<OwnedMonster[]> => {
    return MonsterService.getEnemyParty();
  }

  return {
    getMonsterParty,
    getEnemyParty
  }
}

export default useMonsterFactory;