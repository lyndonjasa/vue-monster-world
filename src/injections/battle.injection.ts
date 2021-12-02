import { Actor } from "@/models/battle/actor";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { InjectionKey, Ref } from "vue";

export const OnSkillActivationKey: InjectionKey<(actorId: string, team: MonsterTeamEnum) => void> = Symbol();
export const CurrentActorKey: InjectionKey<Ref<Actor>> = Symbol();