import { Status } from "../skills/status";
import { Monster } from "./monster";

export class DetailedMonster extends Monster {
  _id: string;
  level: number;
  currentExp: number;
  expToLevel: number;
  appliedStatus: Status[];
  talents: string[];
}