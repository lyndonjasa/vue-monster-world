const useRandomizer = () => {
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

  const procStatus = (chance: number): boolean => {
    const randomValue = randomize(1, 100);

    return chance >= randomValue;
  }

  return {
    randomize,
    procCrit,
    procMiss,
    procStatus
  }
}

export default useRandomizer;