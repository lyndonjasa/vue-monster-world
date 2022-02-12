import { CreateAccountRequest } from "@/http/requests/create-account.request";
import accountService from "@/services/account.service"
import monsterService from "@/services/monster.service";
import useAppStateCore from "../store-hooks/useAppStateCore";

const useAccount = () => {
  const { userId, accountId } = useAppStateCore();
  
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

  const getAccountDetails = () => {
    return accountService.getAccountDetails(accountId.value);
  }

  const getAccountParty = () => {
    return monsterService.getAccountMonsterParty(accountId.value);
  }

  const getAccountMonsterDetail = (monsterId: string) => {
    return monsterService.getAccountMonster(accountId.value, monsterId);
  }

  return {
    deleteUserAccount,
    createUserAccount,
    getAccountDetails,
    getAccountParty,
    getAccountMonsterDetail
  }
}

export default useAccount;