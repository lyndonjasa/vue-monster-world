export class SpriteAnimation {
  name: string;
  dimensions: SpriteDimension;
  idle: Animation;
  attack: Animation;
  ultimate: Animation;
  hit: Animation;
  dead: Animation;
  win: Animation;
}

export interface SpriteDimension {
  scale: number;
  width: number;
  height: number;
}

export interface Animation {
  start: number;
  layer: number;
  end: number;
  speed: number;
}