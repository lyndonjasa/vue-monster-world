import { BuffList } from "@/models/battle/buff-list";
import { BuffEnum } from "@/models/battle/buff.enum";
import { SkillTypeEnum } from "@/models/skills/skill-type.enum";
import { TargetEnum } from "@/models/skills/target.enum";

export const toSkillTypeString = (type: SkillTypeEnum): string => {
  switch (type) {
    case SkillTypeEnum.BUFF:
      return 'Buff'
    case SkillTypeEnum.DAMAGE:
    case SkillTypeEnum.SIGNATURE:
      return 'Damage'
    case SkillTypeEnum.HEAL:
      return 'Heal'
    default:
      throw 'Unsupported Skill Type' 
  }
}

export const toTargetString = (target: TargetEnum): string => {
  switch (target) {
    case TargetEnum.ALLY:
      return 'Ally'
    case TargetEnum.ALL_ALLIES:
      return 'All Allies'
    case TargetEnum.ALL_ENEMIES:
      return 'All Enemies'
    case TargetEnum.SELF:
      return 'Self'
    case TargetEnum.ENEMY:
      return 'Enemy'
    case TargetEnum.OTHERS:
      return 'Others'
    default:
      throw 'Unsupported Target'
  }
}

export const toBuffString = (buff: BuffEnum): string => {
  const selectedBuff = BuffList.find(b => b.id === buff)

  return selectedBuff.name
}