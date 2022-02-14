import { Stats } from "@/models/monster/stats";
import { SpriteAnimation } from "@/models/sprites/sprite-animation";

export interface IBaseMonster {
  baseStats: Stats;
  statGain: Stats;
  sprite: SpriteAnimation;
  _id: string;
  name: string;
  element: number;
  stage: string;
  evolution: string;
}