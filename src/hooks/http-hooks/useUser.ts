import { LoginRequest } from "@/http/requests";
import userService from "@/services/user.service"
import useAppStateCore from "../store-hooks/useAppStateCore";

const useUser = () => {
  const { userId } = useAppStateCore();

  const login = (username: string, password: string) => {
    const request: LoginRequest = {
      username,
      password
    }

    return userService.login(request);
  }

  const getUserAccounts = () => {
    return userService.getUserAccounts(userId.value);
  }

  return {
    login,
    getUserAccounts
  }
}

export default useUser;