import { Status } from "../skills/status";
import { DetailedMonster } from "./detailed-monster";
import { MonsterTeamEnum } from "./monster-team.enum";

export class BattleMonster extends DetailedMonster {
  team: MonsterTeamEnum;
  appliedStatus: Status[];
}