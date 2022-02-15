import useEnvironment from "@/hooks/useEnvironment"
import { IEvolution } from "@/state-management/evolution/evolution.interface";
import { IBaseMonster } from "@/state-management/monsters/base-monster.interface";
import { ITalent } from "@/state-management/talents/talent.interface";
import axios from "axios";

const { apiBaseUrl } = useEnvironment();

const loadEvolutions = (): Promise<IEvolution[]> => {
  return axios.get(`${apiBaseUrl}/evolutions`).then(r => r.data)
}

const loadMonsters = (): Promise<IBaseMonster[]> => {
  return axios.get(`${apiBaseUrl}/monsters`).then(r => r.data)
}

const loadTalents = (): Promise<ITalent[]> => {
  return axios.get(`${apiBaseUrl}/talents`).then(r => r.data)
}

export default {
  loadEvolutions,
  loadMonsters,
  loadTalents
}