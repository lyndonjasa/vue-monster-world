import { SkillDetail } from "../skills/skill-detail";
import { Sprite } from "../sprites/sprite";
import { Stats } from "./stats";

export class Monster {
  name: string;
  stats: Stats;
  sprite: Sprite;
  talents?: string[];
  skills?: SkillDetail[];
  // TODO: add skills
}