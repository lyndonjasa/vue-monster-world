import { Monster } from "./monster";

export class DetailedMonster extends Monster {
  _id: string;
  level: number;
  currentExp: number;
  expToLevel: number;
}