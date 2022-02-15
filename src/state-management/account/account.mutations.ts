import { AccountDetails } from "@/models/account/account-details";
import { MutationTree } from "vuex";
import { AccountState } from "./account.state";

export enum AccountMutationTypes {
  setAccountDetails = 'SET_ACCOUNT_DETAILS'
}

export type AccountMutations = {
 [AccountMutationTypes.setAccountDetails](state: AccountState, payload: AccountDetails): void
}

export const accountMutations: MutationTree<AccountState> & AccountMutations = {
  [AccountMutationTypes.setAccountDetails]: (state: AccountState, payload: AccountDetails) => {
    state.account = payload
  }
}