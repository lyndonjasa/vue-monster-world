import { BuffEnum } from "@/models/battle/buff.enum";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import useBattleEvents from "./useBattleEvents";
import useEnvironment from "./useEnvironment"

const { blindSpeedReduction } = useEnvironment();
const { hasStatus } = useBattleEvents();

const useRandomizer = () => {
  const randomize = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const procCrit = (critRate: number): boolean => {
    const randomValue = randomize(1, 100);

    return critRate >= randomValue;
  }

  const procMiss = (actor: DetailedMonster, target: DetailedMonster): boolean => {
    const speedProbabilityReduction = !hasStatus(actor, BuffEnum.BLIND) ? 1 : blindSpeedReduction;

    // TODO: add speed status [Speed Up, Speed Down]

    const totalSpeed = (actor.stats.speed + target.stats.speed) * speedProbabilityReduction;
    const randomValue = randomize(1, totalSpeed);
    
    return Math.ceil(target.stats.speed * 0.5) >= randomValue;
  }

  const procStatus = (chance: number): boolean => {
    const randomValue = randomize(1, 100);

    return chance >= randomValue;
  }

  return {
    randomize,
    procCrit,
    procMiss,
    procStatus
  }
}

export default useRandomizer;