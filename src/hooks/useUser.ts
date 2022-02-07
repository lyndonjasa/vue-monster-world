import { LoginRequest } from "@/http/requests";
import userService from "@/services/user.service"

const useUser = () => {
  const login = (username: string, password: string) => {
    const request: LoginRequest = {
      username,
      password
    }

    return userService.login(request);
  }

  return {
    login
  }
}

export default useUser;