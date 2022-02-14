import useEnvironment from "@/hooks/useEnvironment"
import { IEvolution } from "@/state-management/evolution/evolution.interface";
import { IBaseMonster } from "@/state-management/monsters/base-monster.interface";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();

const loadEvolutions = (): Promise<IEvolution[]> => {
  return axios.get(`${apiBaseUrl}/evolutions`).then(r => r.data)
}

const loadMonsters = (): Promise<IBaseMonster[]> => {
  return axios.get(`${apiBaseUrl}`).then(r => r.data)
}

export default {
  loadEvolutions,
  loadMonsters
}