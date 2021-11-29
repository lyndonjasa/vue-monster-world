import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { InjectionKey } from "vue";

export const OnSkillActivationKey: InjectionKey<(actorId: string, team: MonsterTeamEnum) => void> = Symbol();