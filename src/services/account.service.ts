import useEnvironment from "@/hooks/useEnvironment";
import { CreateAccountRequest } from "@/http/requests/create-account.request";
import { AccountDetails } from "@/models/account/account-details";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();
const baseAccountRoute = `${apiBaseUrl}/accounts`

const deleteAccount = (accountId: string): Promise<void> => {
  return axios.delete(`${baseAccountRoute}/${accountId}`).then(r => r.data)
}

const createAccount = (request: CreateAccountRequest): Promise<{ accountId: string }> => {
  return axios.post(`${baseAccountRoute}`, request).then(r => r.data);
}

const getAccountDetails = (accountId: string): Promise<AccountDetails> => {
  return axios.get(`${baseAccountRoute}/${accountId}`).then(r => r.data);
}

export default {
  deleteAccount,
  createAccount,
  getAccountDetails
}