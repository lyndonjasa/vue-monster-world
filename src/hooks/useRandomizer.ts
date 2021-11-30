interface Hook {
  randomize(min: number, max: number): number,
  procCrit(critRate: number): boolean
}

const useRandomizer = (): Hook => {
  const randomize = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const procCrit = (critRate: number): boolean => {
    const randomValue = randomize(1, 100);

    return critRate >= randomValue;
  }

  return {
    randomize,
    procCrit
  }
}

export default useRandomizer;