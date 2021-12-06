const useEnvironment = () => {
  const damageMargin: number = process.env.VUE_APP_DAMAGE_MARGIN
  const spriteScale: number = process.env.VUE_APP_SPRITE_SCALE
  const wetAmplifier: number = process.env.VUE_APP_WET_STAT_AMPLICATION
  const burnPercentage: number = process.env.VUE_APP_BURN_DMG_PERCENTAGE
  const blindSpeedReduction: number = process.env.VUE_APP_BLIND_SPEED_REDUCTION

  return {
    damageMargin,
    spriteScale,
    wetAmplifier,
    burnPercentage,
    blindSpeedReduction
  }
}

export default useEnvironment;