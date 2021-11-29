import { OwnedMonster } from "@/models/monster/owned-monster"
import MonsterService from "@/services/monster.service"

interface Factory {
  getMonsterParty(): Promise<OwnedMonster[]>
}

const useMonsterFactory = (): Factory => {

  const getMonsterParty = (): Promise<OwnedMonster[]> => {
    return MonsterService.getMonsterParty('test id');
  }

  return {
    getMonsterParty
  }
}

export default useMonsterFactory;