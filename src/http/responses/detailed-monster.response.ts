import { Stats } from "@/models/monster/stats";
import { SpriteAnimation } from "@/models/sprites/sprite-animation";
import { TalentEnum } from "@/models/talents/talent.enum";
import { SkillResponse } from "./skill.response";

export class DetailedMonsterResponse {
  name: string;
  computedName: string;
  stats: Stats
  _id: string;
  currentExp: number;
  expToLevel: number;
  element: number;
  level: number;
  talents: TalentEnum[];
  talentPoints: number;
  skills: SkillResponse[];
  sprite: SpriteAnimation
  stage: string;
  evolution?: string;
}