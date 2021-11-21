import { Sprite } from "@/models/sprites/sprite";
import { SpriteStateEnum } from "@/models/sprites/sprite-state";
import { spriteData } from "./test-sprite-data";

interface SpriteFactory {
  sprites: Sprite[]
}

const useSpriteFactory = (): SpriteFactory => {
  const data = spriteData;

  const sprites: Sprite[] = [];

  data.forEach(d => {
    const sprite = new Sprite(d.digimon, d.dimensions.width, d.dimensions.height, d.dimensions.scale);
    
    sprite.createState(SpriteStateEnum.IDLE, 
      d.idle.layer,
      d.idle.start,
      d.idle.end,
      d.idle.speed,
      false)

    sprite.createState(SpriteStateEnum.ATTACK, 
      d.attack.layer,
      d.attack.start,
      d.attack.end,
      d.attack.speed,
      true)

    sprite.createState(SpriteStateEnum.ULTIMATE, 
      d.ultimate.layer,
      d.ultimate.start,
      d.ultimate.end,
      d.ultimate.speed,
      true)

    sprite.createState(SpriteStateEnum.HIT, 
      d.hit.layer,
      d.hit.start,
      d.hit.end,
      d.hit.speed,
      false)

    sprite.createState(SpriteStateEnum.DEAD, 
      d.dead.layer,
      d.dead.start,
      d.dead.end,
      d.dead.speed,
      false)

    sprite.createState(SpriteStateEnum.WIN, 
      d.win.layer,
      d.win.start,
      d.win.end,
      d.win.speed,
      false)

    sprites.push(sprite);
  });

  return {
    sprites
  }
}

export default useSpriteFactory;