const useEnvironment = () => {
  const damageMargin: number = process.env.VUE_APP_DAMAGE_MARGIN

  return {
    damageMargin
  }
}

export default useEnvironment;