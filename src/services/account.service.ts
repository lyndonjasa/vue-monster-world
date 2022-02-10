import useEnvironment from "@/hooks/useEnvironment";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();
const baseAccountRoute = `${apiBaseUrl}/accounts`

const deleteAccount = (accountId: string): Promise<void> => {
  return axios.delete(`${baseAccountRoute}/${accountId}`).then(r => r.data)
}

export default {
  deleteAccount
}