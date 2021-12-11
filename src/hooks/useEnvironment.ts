const useEnvironment = () => {
  const damageMargin: number = +process.env.VUE_APP_DAMAGE_MARGIN
  const spriteScale: number = +process.env.VUE_APP_SPRITE_SCALE

  // stat settings
  const wetAmplifier: number = +process.env.VUE_APP_WET_STAT_AMPLICATION
  const burnPercentage: number = +process.env.VUE_APP_BURN_DMG_PERCENTAGE
  const blindSpeedReduction: number = +process.env.VUE_APP_BLIND_SPEED_REDUCTION

  // talent settings
  const wrathProcChance: number = +process.env.VUE_APP_WRATH_PROC_CHANCE
  const wrathMultiplier: number = +process.env.VUE_APP_WRATH_MULTIPLIER
  const vampirismPercentage: number = +process.env.VUE_APP_VAMPIRISM_PERCENTAGE
  const resuPercentage: number = +process.env.VUE_APP_UNDYING_RESU_PERCENTAGE
  const efficiencyPercentage: number = +process.env.VUE_APP_EFFICIENCY_PERCENTAGE
  const lethargyPercentage: number = +process.env.VUE_APP_LETHARGY_PERCENTAGE
  const guardPercentage: number = +process.env.VUE_APP_GUARD_PERCENTAGE
  const prideChance: number = +process.env.VUE_APP_PRIDE_CHANCE
  const retaliationPercentage: number = +process.env.VUE_APP_RETALIATION_PERCENTAGE

  return {
    damageMargin,
    spriteScale,
    wetAmplifier,
    burnPercentage,
    blindSpeedReduction,
    wrathProcChance,
    wrathMultiplier,
    vampirismPercentage,
    resuPercentage,
    efficiencyPercentage,
    lethargyPercentage,
    guardPercentage,
    prideChance,
    retaliationPercentage
  }
}

export default useEnvironment;