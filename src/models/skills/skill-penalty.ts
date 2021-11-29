import { SkillTargetEnum } from "./skill-target.enum";

export class SkillPenalty {
  damage: number;
  target: number | SkillTargetEnum
}