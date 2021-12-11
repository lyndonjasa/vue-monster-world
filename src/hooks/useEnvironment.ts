const useEnvironment = () => {
  const damageMargin: number = process.env.VUE_APP_DAMAGE_MARGIN
  const spriteScale: number = process.env.VUE_APP_SPRITE_SCALE

  // stat settings
  const wetAmplifier: number = process.env.VUE_APP_WET_STAT_AMPLICATION
  const burnPercentage: number = process.env.VUE_APP_BURN_DMG_PERCENTAGE
  const blindSpeedReduction: number = process.env.VUE_APP_BLIND_SPEED_REDUCTION

  // talent settings
  const wrathProcChance: number = process.env.VUE_APP_WRATH_PROC_CHANCE
  const wrathMultiplier: number = process.env.VUE_APP_WRATH_MULTIPLIER

  return {
    damageMargin,
    spriteScale,
    wetAmplifier,
    burnPercentage,
    blindSpeedReduction,
    wrathProcChance,
    wrathMultiplier
  }
}

export default useEnvironment;