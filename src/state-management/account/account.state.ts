import { AccountDetails } from "@/models/account/account-details";

export interface AccountState {
  account: AccountDetails
}

export const accountState: AccountState = {
  account: undefined
}