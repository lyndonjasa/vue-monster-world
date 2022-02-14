import { GetterTree } from 'vuex'
import { IBaseMonster } from './base-monster.interface'
import { MonsterState} from './monster.state'

export type MonsterGetters = {
  baseMonsters(state: MonsterState): IBaseMonster[]
}

export const monsterGetters: GetterTree<MonsterState, MonsterState> & MonsterGetters = {
  baseMonsters: (state: MonsterState) => state.baseMonsters
}