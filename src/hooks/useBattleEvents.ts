import { BuffInstanceEnum } from "@/models/battle/buff-instance.enum";
import { BuffEnum } from "@/models/battle/buff.enum";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Status } from "@/models/skills/status";
import useBattleCalculator from "./useBattleCalculator";

const useBattleEvents = () => {
  const { calculateHealthRegen, calculateManaRegen } = useBattleCalculator();

  const willRegen = (actor: DetailedMonster): boolean => {
    // TODO: add check for Static status

    return actor.stats.health < actor.stats.maxHealth || actor.stats.mana < actor.stats.maxMana;
  }

  const regenerateHealth = (actor: DetailedMonster): void => {
    const regenRate = calculateHealthRegen(actor);

    // if regen goes overboard, max health. . set to max health
    // otherwise, add to current health
    if ((actor.stats.health + regenRate) > actor.stats.maxHealth) {
      actor.stats.health = actor.stats.maxHealth;
    } else {
      actor.stats.health += regenRate;
    }
  }

  const regenerateMana = (actor: DetailedMonster): void => {
    const regenRate = calculateManaRegen(actor);

    // if regen goes overboard, max health. . set to max health
    // otherwise, add to current health
    if ((actor.stats.mana + regenRate) > actor.stats.maxMana) {
      actor.stats.mana = actor.stats.maxMana;
    } else {
      actor.stats.mana += regenRate;
    }
  }

  const applyStatus = (target: DetailedMonster, status: Status): void => {
    // TODO: add reapplication of same buffs

    target.appliedStatus.push(status);
  }

  const hasStatus = (actor: DetailedMonster, status: BuffEnum): boolean => {
    return actor.appliedStatus.find(s => s.buff === status) !== undefined
  }

  const triggerBurn = (target: DetailedMonster): void => {
    const burnDamage = target.appliedStatus.find(s => s.buff === BuffEnum.BURN).appliedDamage;

    // burn damage cannot kill
    if (target.stats.health - burnDamage < 1) {
      target.stats.health = 1;
    } else {
      target.stats.health -= burnDamage;
    }
  }

  const reduceStatusTurns = (actor: DetailedMonster): void => {
    const statusBuffs = actor.appliedStatus.filter(s => s.statusInstance === BuffInstanceEnum.PER_TURN);

    statusBuffs.forEach(sb => {
      sb.duration -= 1;
    })

    // retain statuses that have remaining duration
    actor.appliedStatus = statusBuffs.filter(sb => sb.duration != 0);
  }

  return {
    willRegen,
    regenerateHealth,
    regenerateMana,
    applyStatus,
    hasStatus,
    triggerBurn,
    reduceStatusTurns
  }
}

export default useBattleEvents;