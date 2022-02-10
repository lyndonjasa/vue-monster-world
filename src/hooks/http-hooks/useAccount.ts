import accountService from "@/services/account.service"

const useAccount = () => {
  const deleteUserAccount = (accountId: string) => {
    return accountService.deleteAccount(accountId);
  }

  return {
    deleteUserAccount
  }
}

export default useAccount;