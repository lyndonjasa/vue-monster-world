import { AccountDetails } from "@/models/account/account-details";
import { InjectionKey, Ref } from "vue";

export const ReloadAccountKey: InjectionKey<() => Promise<void>> = Symbol();
export const CurrentAccount: InjectionKey<Ref<AccountDetails>> = Symbol();