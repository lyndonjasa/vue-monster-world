import { SkillTargetEnum } from "./skill-target.enum";
import { SkillTypeEnum } from "./skill-type.enum";

export class Skill {
  name: string;
  element: Element;
  cost: number;
  power: number;
  type: number | SkillTypeEnum;
  target: number | SkillTargetEnum;
  description: string;
  ignoreDefense: boolean;
}