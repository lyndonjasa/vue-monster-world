import { BattleMonster } from "@/models/monster/battle-monster";
import MonsterService from "@/services/monster.service"

interface Factory {
  getMonsterParty(): Promise<BattleMonster[]>,
  getEnemyParty(): Promise<BattleMonster[]>
}

const useMonsterFactory = (): Factory => {

  const getMonsterParty = (): Promise<BattleMonster[]> => {
    return MonsterService.getMonsterParty('test id');
  }

  const getEnemyParty = (): Promise<BattleMonster[]> => {
    return MonsterService.getEnemyParty();
  }

  return {
    getMonsterParty,
    getEnemyParty
  }
}

export default useMonsterFactory;