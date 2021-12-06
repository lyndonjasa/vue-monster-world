import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import useElement from "./useElement";
import useEnvironment from "./useEnvironment";
import useRandomizer from "./useRandomizer";

const useBattleCalculator = () => {

  const { damageMargin, wetAmplifier, burnPercentage } = useEnvironment();
  const { randomize } = useRandomizer();
  const { getElementalMultiplier } = useElement();

  // TODO: 
  // add margin of error
  // add elemental strength / weakness
  const calculateSkillDamage = (actor: DetailedMonster, 
    target: DetailedMonster,
    skill: Skill,
    applyWetAmplifier: boolean): number => {
      const baseDamage = actor.stats.offense * skill.power;
      let damageReduction = target.stats.defense * 0.75;

      // if skill ignores defense, reset divider to 1
      // ignore reduction if skill type is heal or buff
      if (skill.ignoreDefense || 
        (skill.skillType === SkillTypeEnum.HEAL || skill.skillType === SkillTypeEnum.BUFF)) {
        damageReduction = 1
      }

      const elemMultiplier = getElementalMultiplier(skill.skillElement, target.element);

      let grossDamage = Math.ceil((baseDamage / damageReduction) * elemMultiplier);
      console.log(grossDamage);
      // if target has wet status, amplify damage by 10%
      if (applyWetAmplifier) {
        grossDamage = grossDamage * wetAmplifier
      }

      // add margins if skill type is damage/signature
      if (skill.skillType === SkillTypeEnum.DAMAGE || skill.skillType === SkillTypeEnum.SIGNATURE) {
        grossDamage = marginalizeOutput(grossDamage);
      }

      return grossDamage !== 0 ? grossDamage : 1;
  }

  const calculatePenaltyDamage = (actor: DetailedMonster, skill: Skill, target: DetailedMonster) => {
    const baseDamage = (actor.stats.offense * skill.power);
    const damageReduction = target.stats.defense * 0.75;

    const penaltyDamage = Math.ceil((baseDamage / damageReduction) * (skill.penalty.damagePercentage / 100));

    return marginalizeOutput(penaltyDamage);
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

  const calculateBurnDamage = (damage: number): number => {
    const burnDamage = Math.ceil(damage * (burnPercentage / 100))

    return marginalizeOutput(burnDamage);
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
    calculateManaRegen,
    calculatePenaltyDamage,
    calculateBurnDamage
  }
}

export default useBattleCalculator;