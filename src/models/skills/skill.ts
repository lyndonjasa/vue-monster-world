import { SkillTypeEnum } from "./skill-type.enum";
import { TargetEnum } from "./target.enum";

export class Skill {
  name: string;
  cost: number;
  power: number;
  skillType: SkillTypeEnum;
  ignoreDefense: boolean;
  skillTarget: TargetEnum;
}