import { Actor } from "@/models/battle/actor";
import { Target } from "@/models/battle/target";
import { MonsterTeamEnum } from "@/models/monster/monster-team.enum";
import { Skill } from "@/models/skills/skill";
import { ComputedRef, InjectionKey, Ref } from "vue";

export const OnSkillActivationKey: InjectionKey<(actorId: string, team: MonsterTeamEnum, skill: Skill, targetIds: string[]) => void> = Symbol();
export const CurrentActorKey: InjectionKey<Ref<Actor>> = Symbol();
export const LeftTeamTargets: InjectionKey<ComputedRef<Target[]>> = Symbol();
export const RightTeamTargets: InjectionKey<ComputedRef<Target[]>> = Symbol();
export const BlinkingTarget: InjectionKey<Ref<string>> = Symbol();
export const SelectBlinkingTarget: InjectionKey<(monsterId: string) => void> = Symbol();
export const WinningTeam: InjectionKey<Ref<MonsterTeamEnum>> = Symbol();
export const InjectedTypewriter: InjectionKey<(message: string, delay: number) => void> = Symbol();
export const CounterActor: InjectionKey<Ref<{ actor: Actor, target: string }>> = Symbol();