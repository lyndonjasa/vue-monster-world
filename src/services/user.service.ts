import { CreateUserRequest, LoginRequest } from "@/http/requests";
import useEnvironment from '@/hooks/useEnvironment'
import axios from "axios";
import { LoginResponse, UserAccountsResponse } from "@/http/responses";

const { apiBaseUrl } = useEnvironment();
const baseUserRoute = `${apiBaseUrl}/users`

const createUser = async (request: CreateUserRequest) => {
  return axios.post(`${baseUserRoute}/signup`, request);
}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  return axios.post(`${baseUserRoute}/login`, request).then(r => r.data);
}

const getUserAccounts = async (userId: string): Promise<UserAccountsResponse[]> => {
  return axios.get(`${baseUserRoute}/${userId}/accounts`).then(r => r.data)
}

export default {
  createUser,
  login,
  getUserAccounts
}