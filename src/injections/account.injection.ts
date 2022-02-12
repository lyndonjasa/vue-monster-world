import { InjectionKey } from "vue";

export const ReloadAccountKey: InjectionKey<() => Promise<void>> = Symbol();