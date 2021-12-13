import { BuffEnum } from "@/models/battle/buff.enum";
import { BattleMonster } from "@/models/monster/battle-monster";
import { TalentEnum } from "@/models/talents/talent.enum";
import useBattleEvents from "./useBattleEvents";
import useEnvironment from "./useEnvironment"

const { 
  blindSpeedReduction,
  wrathProcChance,
  prideChance,
  lightFootedPercentage,
  intrusionChance
} = useEnvironment();
const { hasStatus, hasTalent } = useBattleEvents();

const useRandomizer = () => {
  const randomize = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const procCrit = (critRate: number): boolean => {
    const randomValue = randomize(1, 100);

    return critRate >= randomValue;
  }

  const procMiss = (actor: BattleMonster, target: BattleMonster): boolean => {
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

    let speedMultiplier = 0.5;
    if (hasTalent(target, TalentEnum.LIGHT_FOOTED)) {
      speedMultiplier += lightFootedPercentage
    }
    
    return Math.ceil(targetSpeed * speedMultiplier) >= randomValue;
  }

  const procStatus = (chance: number): boolean => {
    const randomValue = randomize(1, 100);

    return chance >= randomValue;
  }

  const procWrath = (): boolean => {
    const randomValue = randomize(1, 100);

    return wrathProcChance >= randomValue;
  }

  const procPride = (): boolean => {
    const randomValue = randomize(1, 100);

    return prideChance >= randomValue;
  }

  const procIntrusion = (): boolean => {
    const randomValue = randomize(1, 100);

    return intrusionChance >= randomValue;
  }

  return {
    randomize,
    procCrit,
    procMiss,
    procStatus,
    procWrath,
    procPride,
    procIntrusion
  }
}

export default useRandomizer;