import useEnvironment from "@/hooks/useEnvironment"
import { IEvolution } from "@/state-management/evolution/evolution.interface";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();

const loadEvolutions = (): Promise<IEvolution[]> => {
  return axios.get(`${apiBaseUrl}/evolutions`).then(r => r.data)
}

export default {
  loadEvolutions
}