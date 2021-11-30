import { DetailedMonster } from "@/models/monster/detailed-monster";

interface Hook {
  calculateSkillDamage(actor: DetailedMonster, target: DetailedMonster, skillDamage: number): number,
  calculateCriticalStrike(actor: DetailedMonster, damage: number): number
}

const useBattleCalculator = (): Hook => {

  // TODO: replace skillDamage w/ actual skill model in the future
  // take into account defense penetration
  // add margin of error
  const calculateSkillDamage = (actor: DetailedMonster, 
    target: DetailedMonster,
    skillDamage: number): number => {
      const baseDamage = actor.stats.offense * skillDamage;
      const damageReduction = target.stats.defense * 0.75;

      const grossDamage = Math.ceil(baseDamage / damageReduction);

      return grossDamage > 0 ? grossDamage : 1;
  }

  const calculateCriticalStrike = (actor: DetailedMonster, damage: number): number => {
    return damage * (actor.stats.critDamage / 100);
  }

  return {
    calculateSkillDamage,
    calculateCriticalStrike
  }
}

export default useBattleCalculator;