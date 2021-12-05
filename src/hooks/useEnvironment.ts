const useEnvironment = () => {
  const damageMargin: number = process.env.VUE_APP_DAMAGE_MARGIN
  const spriteScale: number = process.env.VUE_APP_SPRITE_SCALE

  return {
    damageMargin,
    spriteScale
  }
}

export default useEnvironment;