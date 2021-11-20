import { SpriteStateConfig } from "./sprite-state-config";

export enum SpriteStateEnum {
  IDLE = 'idle',
  ATTACK = 'attack',
  ULTIMATE = 'ultimate',
  HIT = 'hit',
  DEAD = 'dead',
  WIN = 'win'
}

export class SpriteState {
  idle: SpriteStateConfig;
  attack: SpriteStateConfig;
  ultimate: SpriteStateConfig;
  hit: SpriteStateConfig;
  dead: SpriteStateConfig;
  win: SpriteStateConfig;
}