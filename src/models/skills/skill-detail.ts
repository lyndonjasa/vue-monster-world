import { Status } from "../status/status";
import { Skill } from "./skill";
import { SkillPenalty } from "./skill-penalty";

export class SkillDetail {
  skill: Skill;
  status: Status;
  penalty: SkillPenalty;
}