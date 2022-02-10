import monsterService from "@/services/monster.service"

const useMonster = () => {
  const getStarterPacks = () => {
    return monsterService.getStarterPacks();
  }

  return {
    getStarterPacks
  }
}

export default useMonster;