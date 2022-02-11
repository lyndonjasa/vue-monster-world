import { delayAction } from "@/helpers/delay.helper";
import { convertResponseToModel, convertToModelForBattle } from "@/helpers/monster.helper";
import { BattleMonster } from "@/models/monster/battle-monster";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import MonsterService from "@/services/monster.service"
import useAppStateCore from "./store-hooks/useAppStateCore";
import useLoaders from "./store-hooks/useLoaders";

const useMonsterFactory = () => {
  const { accountId } = useAppStateCore();
  const { showScreenLoader } = useLoaders();

  const getMonsterParty = (): Promise<BattleMonster[]> => {
    return MonsterService.getMonsterParty('test id');
  }

  const getEnemyParty = (): Promise<BattleMonster[]> => {
    return MonsterService.getEnemyParty();
  }

  const getTeams = async (): Promise<BattleMonster[][]> => {
    showScreenLoader.value = true;
    const party = await MonsterService.getAccountMonsterParty(accountId.value);
    const modelConverted = convertResponseToModel(party);
    const battleConverted = convertToModelForBattle(modelConverted, MonsterTeamEnum.LEFT);

    const enemy = await getEnemyParty();

    await delayAction(3000);
    showScreenLoader.value = false;
    return [battleConverted, enemy];
  }

  return {
    getMonsterParty,
    getEnemyParty,
    getTeams
  }
}

export default useMonsterFactory;