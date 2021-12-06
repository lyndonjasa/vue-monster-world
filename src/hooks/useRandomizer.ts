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

    // actor speed buffs
    let actorSpeed = actor.stats.speed;
    if (hasStatus(actor, BuffEnum.SPEED_UP)) {
      actorSpeed += (actor.stats.speed * 0.5);
    }
    if (hasStatus(actor, BuffEnum.SPEED_DOWN)) {
      actorSpeed -= (actor.stats.speed * 0.5);
    }

    // target speed buffs
    let targetSpeed = target.stats.speed;
    if (hasStatus(target, BuffEnum.SPEED_UP)) {
      targetSpeed += (target.stats.speed * 0.5);
    }
    if (hasStatus(target, BuffEnum.SPEED_DOWN)) {
      targetSpeed -= (target.stats.speed * 0.5);
    }

    const totalSpeed = (actorSpeed + targetSpeed) * speedProbabilityReduction;
    const randomValue = randomize(1, totalSpeed);
    
    return Math.ceil(targetSpeed * 0.5) >= randomValue;
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