import { ElementEnum } from "./element.enum";
import { Penalty } from "./penalty";
import { SkillTypeEnum } from "./skill-type.enum";
import { Status } from "./status";
import { TargetEnum } from "./target.enum";

export class Skill {
  name: string;
  cost: number;
  power: number;
  skillType: SkillTypeEnum;
  ignoreDefense: boolean;
  skillTarget: TargetEnum;
  skillElement: ElementEnum;
  penalty?: Penalty;
  statusEffect?: Status;
}