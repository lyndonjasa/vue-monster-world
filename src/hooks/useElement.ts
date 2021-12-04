import { Element } from '@/models/skills/element';
import { ElementList } from '@/models/skills/element-list';
import { ElementEnum } from '@/models/skills/element.enum';

const useElement = () => {
  const getElementalWeakness = (elementId: number): Element => {
    const element = ElementList.find(e => e.id === elementId);

    return ElementList.find(e => e.id === element.elementalWeakness);
  }

  const getElementalResistance = (elementId: number) => {
    const element = ElementList.find(e => e.id === elementId);

    return ElementList.find(e => e.elementalWeakness === element.id)
  }

  const getElementalAttributes = (elementId: number): { elementalWeakness: Element, elementalResistance: Element } => {
    return {
      elementalWeakness: getElementalWeakness(elementId),
      elementalResistance: getElementalResistance(elementId)
    }
  }

  const getElementalMultiplier = (skillElement: ElementEnum, targetElement: ElementEnum): number => {
    const targetAttributes = getElementalAttributes(targetElement);
      let elementalMultiplier = 1;
      // skill or target is non elemental, use base multiplier
      if (skillElement === ElementEnum.NON_ELEMENTAL || targetElement === ElementEnum.NON_ELEMENTAL) {
        elementalMultiplier = 1;
      } else if (skillElement === targetAttributes.elementalWeakness.id) { // if target is weak against the skill, increase damage by 50%
        elementalMultiplier = 1.5;
      } else if (skillElement === targetAttributes.elementalResistance.id) { // if target resists the element, half the damage
        elementalMultiplier = 0.5;
      } else if (skillElement === targetElement) { // if target and skill has the same element, reduce damage by 25%
        elementalMultiplier = 0.75;
      } else {
        elementalMultiplier = 1
      }

      return elementalMultiplier;
  }

  return {
    getElementalWeakness,
    getElementalResistance,
    getElementalAttributes,
    getElementalMultiplier
  }
}

export default useElement;