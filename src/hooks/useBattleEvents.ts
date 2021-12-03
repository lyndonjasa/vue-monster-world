import { DetailedMonster } from "@/models/monster/detailed-monster";
import useBattleCalculator from "./useBattleCalculator";

interface Hook {
  regenerateHealth(actor: DetailedMonster): void,
  regenerateMana(actor: DetailedMonster): void
}

const useBattleEvents = (): Hook => {
  const { calculateHealthRegen, calculateManaRegen } = useBattleCalculator();

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

  return {
    regenerateHealth,
    regenerateMana
  }
}

export default useBattleEvents;