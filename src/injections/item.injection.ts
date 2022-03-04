import { Item } from "@/models/items/item";
import { InjectionKey, Ref } from "vue";

export const CartItemsKey: InjectionKey<Ref<Item[]>> = Symbol();