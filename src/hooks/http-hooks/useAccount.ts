import { CreateAccountRequest } from "@/http/requests/create-account.request";
import { SearchMonsterRequest } from "@/http/requests/search-monster.request";
import accountService from "@/services/account.service"
import cardService from "@/services/card.service";
import itemService from "@/services/item.service";
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

  const getAccountCards = () => {
    return cardService.getAccountCards(accountId.value);
  }

  const getAccountInventory = () => {
    return itemService.getAccountItems(accountId.value);
  }

  const getAccountMonsters = (request: SearchMonsterRequest) => {
    return monsterService.searchAccountMonsters(accountId.value, request);
  }

  const removeFromParty = async (monsterId: string) => {
    const currentParty = await getAccountParty();
    const monsterParty = currentParty.map(cp => cp._id);
    const remainingIds = monsterParty.filter(mp => mp !== monsterId);

    await monsterService.updateMonsterParty(accountId.value, remainingIds);
  }

  const addToParty = async (monsterId: string) => {
    const currentParty = await getAccountParty();
    const monsterParty = currentParty.map(cp => cp._id);
    monsterParty.push(monsterId)

    await monsterService.updateMonsterParty(accountId.value, monsterParty);
  }

  return {
    deleteUserAccount,
    createUserAccount,
    getAccountDetails,
    getAccountParty,
    getAccountMonsterDetail,
    getAccountCards,
    getAccountInventory,
    getAccountMonsters,
    removeFromParty,
    addToParty
  }
}

export default useAccount;