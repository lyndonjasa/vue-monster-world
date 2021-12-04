import { Actor } from "@/models/battle/actor";
import { Target } from "@/models/battle/target";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { Skill } from "@/models/skills/skill";
import { ComputedRef, InjectionKey, Ref } from "vue";

export const OnSkillActivationKey: InjectionKey<(actorId: string, team: MonsterTeamEnum, skill: Skill) => void> = Symbol();
export const CurrentActorKey: InjectionKey<Ref<Actor>> = Symbol();
export const LeftTeamTargets: InjectionKey<ComputedRef<Target[]>> = Symbol();
export const RightTeamTargets: InjectionKey<ComputedRef<Target[]>> = Symbol();