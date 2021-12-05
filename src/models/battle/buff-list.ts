import { Buff } from "./buff";
import { BuffIconEnum } from "./buff-icon.enum";
import { BuffEnum } from "./buff.enum";

export const BuffList: Buff[] = [
  {
    id: BuffEnum.BURN,
    icon: BuffIconEnum.BURN,
    name: 'Burn'
  },
  {
    id: BuffEnum.WET,
    icon: BuffIconEnum.WET,
    name: 'Wet'
  },
  {
    id: BuffEnum.BLIND,
    icon: BuffIconEnum.BLIND,
    name: 'Blind'
  },
  {
    id: BuffEnum.STATIC,
    icon: BuffIconEnum.STATIC,
    name: 'Static'
  },
  {
    id: BuffEnum.STUN,
    icon: BuffIconEnum.STUN,
    name: 'Stun'
  },
  {
    id: BuffEnum.BOOST,
    icon: BuffIconEnum.BOOST,
    name: 'Boost'
  },
  {
    id: BuffEnum.WELTGEIST,
    icon: BuffIconEnum.BOOST,
    name: 'Weltgeist'
  },
  {
    id: BuffEnum.BARRIER,
    icon: BuffIconEnum.SHIELD,
    name: 'Barrier'
  },
  {
    id: BuffEnum.RAGE,
    icon: BuffIconEnum.BOOST,
    name: 'Rage'
  },
  {
    id: BuffEnum.AGGRO,
    icon: BuffIconEnum.AGGRO,
    name: 'Aggro'
  },
  {
    id: BuffEnum.COUNTER,
    icon: BuffIconEnum.COUNTER,
    name: 'Counter'
  },
  {
    id: BuffEnum.POWER_DOWN,
    icon: BuffIconEnum.DECREASE,
    name: 'Power Down'
  },
  {
    id: BuffEnum.DEFENSE_DOWN,
    icon: BuffIconEnum.DECREASE,
    name: 'Defense Down'
  },
  {
    id: BuffEnum.SPEED_DOWN,
    icon: BuffIconEnum.DECREASE,
    name: 'Speed Down'
  },
  {
    id: BuffEnum.SPEED_UP,
    icon: BuffIconEnum.BOOST,
    name: 'Speed Up'
  },
  {
    id: BuffEnum.POWER_UP,
    icon: BuffIconEnum.BOOST,
    name: 'Power Up'
  },
  {
    id: BuffEnum.DEFENSE_UP,
    icon: BuffIconEnum.BOOST,
    name: 'Defense Up'
  },
  {
    id: BuffEnum.SILENCE,
    icon: BuffIconEnum.SILENCE,
    name: 'Silence'
  },
];