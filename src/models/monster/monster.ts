import { Sprite } from "../sprites/sprite";
import { Stats } from "./stats";

export class Monster {
  name: string;
  stats: Stats;
  sprite: Sprite;
  // TODO: add skills

  constructor(name: string, stats: Stats, sprite: Sprite) {
    this.name = name;
    this.stats = stats;
    this.sprite = sprite;
  }
}