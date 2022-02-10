import { CreateUserRequest, LoginRequest } from "@/http/requests";
import userService from "@/services/user.service"
import useAppStateCore from "../store-hooks/useAppStateCore";

const useUser = () => {
  const { userId } = useAppStateCore();

  const createUser = (request: CreateUserRequest) => {
    return userService.createUser(request);
  }

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
    createUser,
    login,
    getUserAccounts
  }
}

export default useUser;