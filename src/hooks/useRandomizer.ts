interface Hook {
  randomize(min: number, max: number): number,
  procCrit(critRate: number): boolean,
  procMiss(actorSpeed: number, targetSpeed: number): boolean
}

const useRandomizer = (): Hook => {
  const randomize = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const procCrit = (critRate: number): boolean => {
    const randomValue = randomize(1, 100);

    return critRate >= randomValue;
  }

  const procMiss = (actorSpeed: number, targetSpeed: number): boolean => {
    const totalSpeed = actorSpeed + targetSpeed;
    const randomValue = randomize(0, totalSpeed);
    
    return Math.ceil(targetSpeed * 0.5) >= randomValue;
  }

  return {
    randomize,
    procCrit,
    procMiss
  }
}

export default useRandomizer;