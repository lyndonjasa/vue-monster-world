<template>
  <div class="account-monster-details">
    <div class="monster-sprite">
      <sprite-canvas :spriteState="sprites[0].getState(state)"
        :isEnemy="false"
        :sprite="sprites[0]"></sprite-canvas>
    </div>
    <div class="monster-details">

    </div>
  </div>
</template>
    
<script lang="ts">
import SpriteCanvas from '@/components/battle/SpriteCanvas.vue';
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { defineComponent, Prop, ref } from 'vue'

interface Props {
  monster: DetailedMonsterResponse;
}

const AccountMonsterDetails = defineComponent({
  components: {
    SpriteCanvas
  },
  props: {
    monster: { required: true } as Prop<DetailedMonsterResponse>
  },
  setup(props: Props) {
    const state = SpriteStateEnum.IDLE;
    const { sprites } = useSpriteFactory([props.monster.sprite]);

    return {
      state,
      sprites
    }
  },
})

export default AccountMonsterDetails;
</script>

<style lang="scss" scoped>
.account-monster-details {
  display: flex;
  border: 1px solid white;
  border-radius: 3px;
  padding: 10px;

  .monster-sprite {
    width: 240px;
    height: 210px;
    display: flex;
    align-items: flex-end;
    margin-right: 20px;
  }

  .monster-details {
    width: calc(100% - 260px);
    background-color: yellow;
    align-self: stretch;
  }
}
</style>