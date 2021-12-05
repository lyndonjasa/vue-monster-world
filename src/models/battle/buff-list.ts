import { Buff } from "./buff";
import { BuffIconEnum } from "./buff-icon.enum";
import { BuffInstanceEnum } from "./buff-instance.enum";
import { BuffEnum } from "./buff.enum";

export const BuffList: Buff[] = [
  {
    id: BuffEnum.BURN,
    icon: BuffIconEnum.BURN,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Burn'
  },
  {
    id: BuffEnum.WET,
    icon: BuffIconEnum.WET,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Wet'
  },
  {
    id: BuffEnum.BLIND,
    icon: BuffIconEnum.BLIND,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Blind'
  },
  {
    id: BuffEnum.STATIC,
    icon: BuffIconEnum.STATIC,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Static'
  },
  {
    id: BuffEnum.STUN,
    icon: BuffIconEnum.STUN,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Stun'
  },
  {
    id: BuffEnum.BOOST,
    icon: BuffIconEnum.BOOST,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Boost'
  },
  {
    id: BuffEnum.WELTGEIST,
    icon: BuffIconEnum.BOOST,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Weltgeist'
  },
  {
    id: BuffEnum.BARRIER,
    icon: BuffIconEnum.SHIELD,
    instance: BuffInstanceEnum.PER_INSTANCE,
    name: 'Barrier'
  },
  {
    id: BuffEnum.RAGE,
    icon: BuffIconEnum.BOOST,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Rage'
  },
  {
    id: BuffEnum.AGGRO,
    icon: BuffIconEnum.AGGRO,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Aggro'
  },
  {
    id: BuffEnum.COUNTER,
    icon: BuffIconEnum.COUNTER,
    instance: BuffInstanceEnum.PER_INSTANCE,
    name: 'Counter'
  },
  {
    id: BuffEnum.POWER_DOWN,
    icon: BuffIconEnum.DECREASE,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Power Down'
  },
  {
    id: BuffEnum.DEFENSE_DOWN,
    icon: BuffIconEnum.DECREASE,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Defense Down'
  },
  {
    id: BuffEnum.SPEED_DOWN,
    icon: BuffIconEnum.DECREASE,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Speed Down'
  },
  {
    id: BuffEnum.SPEED_UP,
    icon: BuffIconEnum.BOOST,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Speed Up'
  },
  {
    id: BuffEnum.POWER_UP,
    icon: BuffIconEnum.BOOST,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Power Up'
  },
  {
    id: BuffEnum.DEFENSE_UP,
    icon: BuffIconEnum.BOOST,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Defense Up'
  },
  {
    id: BuffEnum.SILENCE,
    icon: BuffIconEnum.SILENCE,
    instance: BuffInstanceEnum.PER_TURN,
    name: 'Silence'
  },
];