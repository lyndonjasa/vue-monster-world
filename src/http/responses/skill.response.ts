import { Status } from "@/models/skills/status";
import { Penalty } from '@/models/skills/penalty'

export class SkillResponse {
  name: string;
  cost: number;
  power: number;
  skillType: number;
  skillTarget: number;
  skillElement: number;
  description: string;
  ignoreDefense: boolean;
  status?: Status;
  penalty?: Penalty;
}