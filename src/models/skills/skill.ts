import { ElementEnum } from "../element/element.enum";
import { SkillTargetEnum } from "./skill-target.enum";
import { SkillTypeEnum } from "./skill-type.enum";

export class Skill {
  name: string;
  element: number | ElementEnum;
  cost: number;
  power: number;
  type: number | SkillTypeEnum;
  target: number | SkillTargetEnum;
  description: string;
  ignoreDefense: boolean;
}