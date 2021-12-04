import { Target } from "@/models/battle/target";
import { Skill } from "@/models/skills/skill";
import { TargetEnum } from "@/models/skills/target.enum";
import useRandomizer from "./useRandomizer";

const useAI = (commands: Skill[], manaPool: number, allies: Target[], enemies: Target[]) => {
  const { randomize } = useRandomizer();

  const getAction = (): Skill => {
    // select only commands that are viable with the current mana pool
    const availableCommands = commands.filter(c => c.cost <= manaPool);
    const commandIndex = randomize(0, availableCommands.length - 1);

    return availableCommands[commandIndex];
  }

  const getSelectedTarget = (command: Skill): Target => {
    const availableTargets = command.skillTarget === TargetEnum.ALLY ? allies : enemies;

    const targetIndex = randomize(0, availableTargets.length - 1);

    return availableTargets[targetIndex];
  }

  return {
    getAction,
    getSelectedTarget
  }
}

export default useAI;