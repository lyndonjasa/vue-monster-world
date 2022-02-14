import { CommitOptions, createStore, Store } from "vuex";
import { CardInventoryGetters, cardInventoryGetters } from "./card-inventory.getters";
import { CardInventoryMutations, cardInventoryMutations } from "./card-inventory.mutations";
import { cardInventoryState, ICardInventoryState } from "./card-inventory.state";

export const cardInventoryStore = createStore({
  state: cardInventoryState,
  getters: cardInventoryGetters,
  mutations: cardInventoryMutations
})

export type CardInventoryStore = Omit<
  Store<ICardInventoryState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof CardInventoryMutations, P extends Parameters<CardInventoryMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<CardInventoryMutations[K]>
} & {
  getters: {
    [K in keyof CardInventoryGetters]: ReturnType<CardInventoryGetters[K]>
  }
}

export function useCardInventoryStore() {
  return cardInventoryStore as CardInventoryStore
}