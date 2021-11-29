import { Monster } from "./monster";

export class OwnedMonster extends Monster {
  _id: string;
  level: number;
  currentExp: number;
  expToLevel: number;
}