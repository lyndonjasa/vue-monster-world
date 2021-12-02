import { Skill } from "../skills/skill";
import { Sprite } from "../sprites/sprite";
import { Stats } from "./stats";

export class Monster {
  name: string;
  stats: Stats;
  sprite: Sprite;
  skills?: Skill[];
}