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

  return {
    willRegen,
    regenerateHealth,
    regenerateMana,
    applyStatus
  }
}

export default useBattleEvents;