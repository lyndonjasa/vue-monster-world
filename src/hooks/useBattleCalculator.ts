import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Skill } from "@/models/skills/skill";

interface Hook {
  calculateSkillDamage(actor: DetailedMonster, target: DetailedMonster, skill: Skill): number,
  calculateCriticalStrike(actor: DetailedMonster, damage: number): number,
  calculateHealthRegen(actor: DetailedMonster): number,
  calculateManaRegen(actor: DetailedMonster): number
}

const useBattleCalculator = (): Hook => {

  // TODO: 
  // add margin of error
  // add elemental strength / weakness
  const calculateSkillDamage = (actor: DetailedMonster, 
    target: DetailedMonster,
    skill: Skill): number => {
      const baseDamage = actor.stats.offense * skill.power;
      let damageReduction = target.stats.defense * 0.75;

      // if skill ignores defense, reset divider to 1
      if (skill.ignoreDefense) {
        damageReduction = 1
      }

      const grossDamage = Math.ceil(baseDamage / damageReduction);

      return grossDamage !== 0 ? grossDamage : 1;
  }

  const calculateCriticalStrike = (actor: DetailedMonster, damage: number): number => {
    return damage * (actor.stats.critDamage / 100);
  }

  const calculateHealthRegen = (actor: DetailedMonster): number => {
    // TODO: add health regen talent in the future
    // check for Static status if regen would persist

    return Math.ceil(actor.stats.maxHealth * (actor.stats.healthRegen / 100));
  }

  const calculateManaRegen = (actor: DetailedMonster): number => {
    // TODO: add mana regen talent in the future
    // check for Static status if regen would persist

    return Math.ceil(actor.stats.maxMana * (actor.stats.manaRegen / 100));
  }

  return {
    calculateSkillDamage,
    calculateCriticalStrike,
    calculateHealthRegen,
    calculateManaRegen
  }
}

export default useBattleCalculator;