import { Element } from './element';
import { ElementEnum } from './element.enum';

export const ElementList: Element[] = [
  {
    id: ElementEnum.NON_ELEMENTAL,
    name: 'Non Elemental',
    elementalWeakness: undefined
  },
  {
    id: ElementEnum.FIRE,
    name: 'Fire',
    elementalWeakness: ElementEnum.WATER
  },
  {
    id: ElementEnum.WIND,
    name: 'Wind',
    elementalWeakness: ElementEnum.FIRE
  },
  {
    id: ElementEnum.ELECTRIC,
    name: 'Electric',
    elementalWeakness: ElementEnum.WIND
  },
  {
    id: ElementEnum.ROCK,
    name: 'Rock',
    elementalWeakness: ElementEnum.ELECTRIC
  },
  {
    id: ElementEnum.WATER,
    name: 'Water',
    elementalWeakness: ElementEnum.ROCK
  }
]