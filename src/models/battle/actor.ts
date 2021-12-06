import { Skill } from "../skills/skill";

export class Actor {
  monsterId: string;
  actorSkills?: Skill[];
  enableAction: boolean;
}