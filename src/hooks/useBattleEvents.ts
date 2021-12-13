import { BuffInstanceEnum } from "@/models/battle/buff-instance.enum";
import { BuffEnum } from "@/models/battle/buff.enum";
import { BattleMonster } from "@/models/monster/battle-monster";
import { Status } from "@/models/skills/status";
import { TalentEnum } from "@/models/talents/talent.enum";

const useBattleEvents = () => {
  const willRegen = (actor: BattleMonster): boolean => {
    return actor.stats.health < actor.stats.maxHealth || actor.stats.mana < actor.stats.maxMana;
  }

  const regenerateHealth = (actor: BattleMonster, regenRate: number): void => {
    // if regen goes overboard, max health. . set to max health
    // otherwise, add to current health
    if ((actor.stats.health + regenRate) > actor.stats.maxHealth) {
      actor.stats.health = actor.stats.maxHealth;
    } else {
      actor.stats.health += regenRate;
    }
  }

  const regenerateMana = (actor: BattleMonster, regenRate: number): void => {
    // if regen goes overboard, max health. . set to max health
    // otherwise, add to current health
    if ((actor.stats.mana + regenRate) > actor.stats.maxMana) {
      actor.stats.mana = actor.stats.maxMana;
    } else {
      actor.stats.mana += regenRate;
    }
  }

  const reduceHealth = (target: BattleMonster, reductionRate: number): void => {
    if ((target.stats.health - reductionRate) < 0) {
      target.stats.health = 0;
    } else {
      target.stats.health -= reductionRate;
    }
  }

  const reduceMana = (target: BattleMonster, reductionRate: number): void => {
    if ((target.stats.mana - reductionRate) < 0) {
      target.stats.mana = 0;
    } else {
      target.stats.mana -= reductionRate;
    }
  }

  const applyStatus = (target: BattleMonster, status: Status): void => {
    const existingApplication = target.appliedStatus.find(as => as.buff === status.buff);

    // if status exists, overwrite
    if (existingApplication) {
      existingApplication.duration = status.duration;
      existingApplication.appliedDamage = status.appliedDamage;
    } else { // otherwise stack
      target.appliedStatus.push(status);
    }
  }

  const hasStatus = (actor: BattleMonster, status: BuffEnum): boolean => {
    return actor.appliedStatus.find(s => s.buff === status) !== undefined
  }

  const triggerBurn = (target: BattleMonster): void => {
    const burnDamage = target.appliedStatus.find(s => s.buff === BuffEnum.BURN).appliedDamage;

    // burn damage cannot kill
    if (target.stats.health - burnDamage < 1) {
      target.stats.health = 1;
    } else {
      target.stats.health -= burnDamage;
    }
  }

  const reduceStatusTurns = (actor: BattleMonster): void => {
    const statusBuffs = actor.appliedStatus.filter(s => s.statusInstance === BuffInstanceEnum.PER_TURN);

    statusBuffs.forEach(sb => {
      sb.duration -= 1;
    })

    removeExpiredBuffs(actor);
  }

  const reduceStatusInstance = (actor: BattleMonster, buff: BuffEnum): void => {
    const statusBuff = actor.appliedStatus.find(s => s.buff === buff);
    statusBuff.duration -= 1;

    removeExpiredBuffs(actor);
  }

  const removeExpiredBuffs = (actor: BattleMonster): void => {
    // retain statuses that have remaining duration
    actor.appliedStatus = actor.appliedStatus.filter(sb => sb.duration != 0);
  }

  const hasTalent = (monster: BattleMonster, talent: TalentEnum): boolean => {
    return monster.talents.find(t => t === talent) !== undefined
  }

  const removeTalent = (monster: BattleMonster, talent: TalentEnum): void => {
    monster.talents = monster.talents.filter(t => t !== talent);
  }

  return {
    willRegen,
    regenerateHealth,
    regenerateMana,
    applyStatus,
    hasStatus,
    triggerBurn,
    reduceStatusTurns,
    reduceStatusInstance,
    hasTalent,
    removeTalent,
    reduceMana,
    reduceHealth
  }
}

export default useBattleEvents;