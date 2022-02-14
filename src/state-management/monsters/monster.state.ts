import { IBaseMonster } from "./base-monster.interface";

export interface MonsterState {
  baseMonsters: IBaseMonster[]
}

export const monsterState: MonsterState = {
  baseMonsters: []
}