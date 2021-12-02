import { SkillTypeEnum } from "./skill-type.enum";

export class Skill {
  name: string;
  cost: number;
  power: number;
  skillType: SkillTypeEnum;
}