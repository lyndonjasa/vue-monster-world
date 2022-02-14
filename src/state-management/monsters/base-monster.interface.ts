import { Stats } from "@/models/monster/stats";
import { Sprite } from "@/models/sprites/sprite";

export interface IBaseMonster {
  baseStats: Stats;
  statGain: Stats;
  sprite: Sprite;
  _id: string;
  name: string;
  element: number;
  stage: string;
  evolution: string;
}