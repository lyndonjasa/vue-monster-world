import useEnvironment from "@/hooks/useEnvironment";
import { ItemInventoryResponse } from "@/http/responses/item-inventory.response";
import { ItemResponse } from "@/http/responses/item-response";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();
const baseAccountRoute = `${apiBaseUrl}/accounts`;
const baseItemsRoute = `${apiBaseUrl}/items`;

const getAccountItems = (accountId: string): Promise<ItemInventoryResponse[]> => {
  return axios.get(`${baseAccountRoute}/${accountId}/inventory`).then(r => r.data);
}

const getItems = (): Promise<ItemResponse[]> => {
  return axios.get(`${baseItemsRoute}`).then(r => r.data);
}

export default {
  getAccountItems,
  getItems
}