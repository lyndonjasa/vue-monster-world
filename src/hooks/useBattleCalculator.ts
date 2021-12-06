import { BuffEnum } from "@/models/battle/buff.enum";
import { DetailedMonster } from "@/models/monster/detailed-monster";
import { Skill } from "@/models/skills/skill";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import useBattleEvents from "./useBattleEvents";
import useElement from "./useElement";
import useEnvironment from "./useEnvironment";
import useRandomizer from "./useRandomizer";

const useBattleCalculator = () => {

  const { damageMargin, wetAmplifier, burnPercentage } = useEnvironment();
  const { randomize } = useRandomizer();
  const { getElementalMultiplier } = useElement();
  const { hasStatus } = useBattleEvents();

  // TODO: 
  // add margin of error
  // add elemental strength / weakness
  const calculateSkillDamage = (actor: DetailedMonster, 
    target: DetailedMonster,
    skill: Skill): number => {
      let actorOffense = actor.stats.offense;
      if (hasStatus(actor, BuffEnum.POWER_UP)) {
        actorOffense += (actor.stats.offense * 0.25)
      }
      if (hasStatus(actor, BuffEnum.POWER_DOWN)) {
        actorOffense -= (actor.stats.offense * 0.25)
      }

      let targetDefense = target.stats.defense;
      if (hasStatus(target, BuffEnum.DEFENSE_UP)) {
        targetDefense += (target.stats.defense * 0.25)
      }
      if (hasStatus(target, BuffEnum.DEFENSE_DOWN)) {
        targetDefense -= (target.stats.defense * 0.25)
      }

      const baseDamage = actorOffense * skill.power;
      let damageReduction = targetDefense * 0.75;

      // if skill ignores defense, reset divider to 1
      // ignore reduction if skill type is heal or buff
      if (skill.ignoreDefense || 
        (skill.skillType === SkillTypeEnum.HEAL || skill.skillType === SkillTypeEnum.BUFF)) {
        damageReduction = 1
      }

      const elemMultiplier = getElementalMultiplier(skill.skillElement, target.element);

      let damageBuffMultiplier = 1;
      if (hasStatus(actor, BuffEnum.BOOST)) {
        damageBuffMultiplier *= 2;
      }
      if (hasStatus(actor, BuffEnum.WELTGEIST)) {
        damageBuffMultiplier *= 3;
      }

      let grossDamage = Math.ceil((baseDamage / damageReduction) * elemMultiplier) * damageBuffMultiplier;
      
      // if target has wet status, amplify damage by 10%
      if (hasStatus(target, BuffEnum.WET)) {
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

    const lowerMargin = Math.ceil(damage - marginValue);
    const upperMargin = Math.ceil(damage + marginValue);

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