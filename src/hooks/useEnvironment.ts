const useEnvironment = () => {
  const damageMargin: number = process.env.VUE_APP_DAMAGE_MARGIN
  const spriteScale: number = process.env.VUE_APP_SPRITE_SCALE
  const wetAmplifier: number = process.env.VUE_APP_WET_STAT_AMPLICATION
  const burnPercentage: number = process.env.VUE_APP_BURN_DMG_PERCENTAGE

  return {
    damageMargin,
    spriteScale,
    wetAmplifier,
    burnPercentage
  }
}

export default useEnvironment;