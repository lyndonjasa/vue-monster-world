import { useStorage } from "vue-composable";

const useSession = () => {
  const baseKey = '__monster_world';
  const userIdKey = `${baseKey}_userId`
  const userNameKey = `${baseKey}_userName`
  const accountIdKey = `${baseKey}_accountId`

  const { storage: sessionUserId, clear: clearUser } = useStorage(userIdKey);
  const { storage: sessionUsername, clear: clearUsername } = useStorage(userNameKey);
  const { storage: sessionAccountId, clear: clearAccount } = useStorage(accountIdKey);

  const clearSession = () => {
    clearUser();
    clearUsername();
    clearAccount();
  }

  return {
    clearSession,
    sessionUserId,
    sessionUsername,
    sessionAccountId
  }
}

export default useSession;