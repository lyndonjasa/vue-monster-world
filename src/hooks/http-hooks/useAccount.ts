import { CreateAccountRequest } from "@/http/requests/create-account.request";
import accountService from "@/services/account.service"
import useAppStateCore from "../store-hooks/useAppStateCore";

const useAccount = () => {
  const { userId } = useAppStateCore();
  
  const deleteUserAccount = (accountId: string) => {
    return accountService.deleteAccount(accountId);
  }

  const createUserAccount = (accountName: string, rookieGroup: number) => {
    const request: CreateAccountRequest = {
      accountName,
      rookieGroup,
      userId: userId.value
    }

    return accountService.createAccount(request);
  }

  return {
    deleteUserAccount,
    createUserAccount
  }
}

export default useAccount;