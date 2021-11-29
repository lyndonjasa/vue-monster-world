import { StatusEffectEnum } from "./status-effect.enum";
import { StatusInstanceEnum } from "./status-instance.enum";

export class Status {
  _id: number;
  status: string | StatusEffectEnum;
  element: string;
  description: string;
  countdown: string | StatusInstanceEnum;
}