import useEnvironment from "@/hooks/useEnvironment";
import { CardInventoryResponse } from "@/http/responses";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();
const baseAccountRoute = `${apiBaseUrl}/accounts`

const getAccountCards = (accountId: string): Promise<CardInventoryResponse> => {
  return axios.get(`${baseAccountRoute}/${accountId}/cards`).then(r => r.data)
}

const convertToCard = (accountId: string, monsterId: string): Promise<void> => {
  return axios.put(`${baseAccountRoute}/${accountId}/monsters/${monsterId}/card`).then(r => r.data)
}

export default {
  getAccountCards,
  convertToCard
}