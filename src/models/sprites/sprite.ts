import { SpriteState, SpriteStateEnum } from "./sprite-state";
import { SpriteStateConfig } from "./sprite-state-config";

export class Sprite {
  states?: SpriteState;
  name: string;
  width: number;
  height: number;
  scale: number;

  constructor(name: string, width: number, height: number, scale: number) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.states = new SpriteState();
  }

  createState(name: SpriteStateEnum, 
    spriteLayer: number, 
    startIndex: number, 
    endIndex: number, 
    animationSpeed: number,
    resetAfterAnimation: boolean): void {
    if (!this.states[name]) {
      this.states[name] = {
        layer: spriteLayer,
        frameIndex: startIndex,
        startIndex,
        endIndex,
        animationSpeed,
        resetAfterAnimation
      }
    }
  }

  getState(name: SpriteStateEnum): SpriteStateConfig {
    if (this.states[name]) {
      return this.states[name];
    } else {
      throw `${name} state is not defined for this sprite`;
    }
  }

  resetState(name: SpriteStateEnum): void {
    if (this.states[name]) {
      this.states[name].frameIndex = this.states[name].startIndex;
    }
  }
}