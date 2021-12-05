import { BuffInstanceEnum } from "../battle/buff-instance.enum";
import { BuffEnum } from "../battle/buff.enum";
import { TargetEnum } from "./target.enum";

export class Status {
  duration: number;
  statusInstance: BuffInstanceEnum;
  appliedDamage?: number;
  target: TargetEnum;
  buff: BuffEnum;
  chance: number;
}