import useEnvironment from "@/hooks/useEnvironment";
import { ItemInventoryResponse } from "@/http/responses/item-inventory.response";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();
const baseAccountRoute = `${apiBaseUrl}/accounts`

const getAccountItems = (accountId: string): Promise<ItemInventoryResponse[]> => {
  return axios.get(`${baseAccountRoute}/${accountId}/inventory`).then(r => r.data);
}

export default {
  getAccountItems
}