import { ElementEnum } from "../skills/element.enum";
import { Skill } from "../skills/skill";
import { Sprite } from "../sprites/sprite";
import { Stats } from "./stats";

export class Monster {
  name: string;
  stats: Stats;
  sprite: Sprite;
  element: ElementEnum;
  skills?: Skill[];
}