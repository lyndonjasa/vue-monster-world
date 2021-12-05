import { BuffIconEnum } from "./buff-icon.enum";
import { BuffInstanceEnum } from "./buff-instance.enum";

export class Buff {
  id: number;
  name: string;
  icon: BuffIconEnum;
  instance: BuffInstanceEnum;
}