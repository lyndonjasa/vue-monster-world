import { AccountDetails } from "@/models/account/account-details";
import { GetterTree } from "vuex";
import { AccountState } from "./account.state";

export type AccountGetters = {
  account(state: AccountState): AccountDetails
}

export const accountGetters: GetterTree<AccountState, AccountState> & AccountGetters = {
  account: (state: AccountState) => state.account
} 