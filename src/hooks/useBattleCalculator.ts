import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import useEnvironment from "./useEnvironment";
import useRandomizer from "./useRandomizer";

interface Hook {
  calculateSkillDamage(actor: DetailedMonster, target: DetailedMonster, skill: Skill): number,
  calculateCriticalStrike(actor: DetailedMonster, damage: number): number,
  calculateHealthRegen(actor: DetailedMonster): number,
  calculateManaRegen(actor: DetailedMonster): number,
}

const useBattleCalculator = (): Hook => {

  const { damageMargin } = useEnvironment();
  const { randomize } = useRandomizer();

  // TODO: 
  // add margin of error
  // add elemental strength / weakness
  const calculateSkillDamage = (actor: DetailedMonster, 
    target: DetailedMonster,
    skill: Skill): number => {
      const baseDamage = actor.stats.offense * skill.power;
      let damageReduction = target.stats.defense * 0.75;

      // if skill ignores defense, reset divider to 1
      // ignore reduction if skill type is heal or buff
      if (skill.ignoreDefense || 
        (skill.skillType === SkillTypeEnum.HEAL || skill.skillType === SkillTypeEnum.BUFF)) {
        damageReduction = 1
      }

      let grossDamage = Math.ceil(baseDamage / damageReduction);

      // add margins if skill type is damage/signature
      if (skill.skillType === SkillTypeEnum.DAMAGE || skill.skillType === SkillTypeEnum.SIGNATURE) {
        grossDamage = marginalizeOutput(grossDamage);
      }

      return grossDamage !== 0 ? grossDamage : 1;
  }

  const calculateCriticalStrike = (actor: DetailedMonster, damage: number): number => {
    return damage * (actor.stats.critDamage / 100);
  }

  const calculateHealthRegen = (actor: DetailedMonster): number => {
    // TODO: add health regen talent in the future

    return Math.ceil(actor.stats.maxHealth * (actor.stats.healthRegen / 100));
  }

  const calculateManaRegen = (actor: DetailedMonster): number => {
    // TODO: add mana regen talent in the future

    return Math.ceil(actor.stats.maxMana * (actor.stats.manaRegen / 100));
  }

  const marginalizeOutput = (damage: number): number => {
    const marginValue = damage * (damageMargin / 100);

    const lowerMargin = Math.floor(damage - marginValue);
    const upperMargin = Math.floor(damage + marginValue);

    return randomize(lowerMargin, upperMargin);
  } 

  return {
    calculateSkillDamage,
    calculateCriticalStrike,
    calculateHealthRegen,
    calculateManaRegen
  }
}

export default useBattleCalculator;