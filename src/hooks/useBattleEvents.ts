import { BuffInstanceEnum } from "@/models/battle/buff-instance.enum";
import { BuffEnum } from "@/models/battle/buff.enum";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Status } from "@/models/skills/status";

const useBattleEvents = () => {
  const willRegen = (actor: DetailedMonster): boolean => {
    return actor.stats.health < actor.stats.maxHealth || actor.stats.mana < actor.stats.maxMana;
  }

  const regenerateHealth = (actor: DetailedMonster, regenRate: number): void => {
    // if regen goes overboard, max health. . set to max health
    // otherwise, add to current health
    if ((actor.stats.health + regenRate) > actor.stats.maxHealth) {
      actor.stats.health = actor.stats.maxHealth;
    } else {
      actor.stats.health += regenRate;
    }
  }

  const regenerateMana = (actor: DetailedMonster, regenRate: number): void => {
    // if regen goes overboard, max health. . set to max health
    // otherwise, add to current health
    if ((actor.stats.mana + regenRate) > actor.stats.maxMana) {
      actor.stats.mana = actor.stats.maxMana;
    } else {
      actor.stats.mana += regenRate;
    }
  }

  const applyStatus = (target: DetailedMonster, status: Status): void => {
    const existingApplication = target.appliedStatus.find(as => as.buff === status.buff);

    // if status exists, overwrite
    if (existingApplication) {
      existingApplication.duration = status.duration;
      existingApplication.appliedDamage = status.appliedDamage;
    } else { // otherwise stack
      target.appliedStatus.push(status);
    }
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

    removeExpiredBuffs(actor);
  }

  const reduceStatusInstance = (actor: DetailedMonster, buff: BuffEnum): void => {
    const statusBuff = actor.appliedStatus.find(s => s.buff === buff);
    statusBuff.duration -= 1;

    removeExpiredBuffs(actor);
  }

  const removeExpiredBuffs = (actor: DetailedMonster): void => {
    // retain statuses that have remaining duration
    actor.appliedStatus = actor.appliedStatus.filter(sb => sb.duration != 0);
  }

  return {
    willRegen,
    regenerateHealth,
    regenerateMana,
    applyStatus,
    hasStatus,
    triggerBurn,
    reduceStatusTurns,
    reduceStatusInstance
  }
}

export default useBattleEvents;