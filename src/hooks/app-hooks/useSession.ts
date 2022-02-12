import { computed } from "vue";
import { useStorage } from "vue-composable";

const useSession = () => {
  const baseKey = '__monster_world';
  const userIdKey = `${baseKey}_userId`
  const userNameKey = `${baseKey}_userName`
  const accountIdKey = `${baseKey}_accountId`

  const { storage: sessionUserId, remove: clearUser } = useStorage(userIdKey);
  const { storage: sessionUsername, remove: clearUsername } = useStorage(userNameKey);
  const { storage: sessionAccountId, remove: clearAccount } = useStorage(accountIdKey);

  const hasUserSession = computed(() => {
    return (sessionUserId.value !== undefined &&
            sessionUserId.value !== 'undefined') &&
          (sessionUsername.value !== undefined &&
            sessionUsername.value !== 'undefined')
  })

  const hasAccountSession = computed(() => {
    return sessionAccountId.value !== undefined &&
            sessionAccountId.value !== 'undefined'
  })

  const clearSession = () => {
    clearUser();
    clearUsername();
    clearAccount();
  }

  return {
    clearSession,
    clearAccount,
    hasUserSession,
    hasAccountSession,
    sessionUserId,
    sessionUsername,
    sessionAccountId
  }
}

export default useSession;