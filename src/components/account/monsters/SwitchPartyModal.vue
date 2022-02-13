<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-body">
          Switch With:
          <div class="party-monster" v-for="monster in party" :key="monster._id">
            <div class="monster-thumbnail">
              <base-monster-thumbnail :src="getMonsterThumbnail(monster.monster.name)" :title="monsterName(monster)" />
            </div>
            <div class="monster-detail">
              <p>{{ monsterName(monster) }}</p>
              <p>
                <base-element :element="monster.monster.element" />
                Lvl. {{ monster.level }}
              </p>
            </div>
            <div class="action">
              <fa-icon :icon="faRightLeft" 
                :title="`Switch with ${monsterName(monster)}`"
                @click="onSwitch(monster._id)" />
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="app-generic-btn" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { getMonsterThumbnail } from '@/helpers/monster.helper';
import { MonsterParty } from '@/models/account/account-details';
import { defineComponent, Prop } from 'vue'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'

interface Emits {
  'onClose': any,
  'onSwitch'(switchedMonsterId: string): boolean
}

interface Props extends Emits {
  party: MonsterParty[]
}

const SwitchPartyModal = defineComponent({
  props: {
    party: { required: true } as Prop<MonsterParty[]>
  },
  emits: {
    'close': null,
    'switch': (switchedMonsterId: string) => switchedMonsterId != undefined
  },
  setup(_: Props, context) {
    const monsterName = (monster: MonsterParty) => {
      if (monster.cardBonus > 0) {
        return `${monster.monster.name} +${monster.cardBonus}`
      } else {
        return monster.monster.name
      }
    }

    const onSwitch = (selectedId: string) => {
      context.emit('switch', selectedId)
    }

    const closeModal = () => {
      context.emit('close');
    }

    return {
      onSwitch,
      closeModal,
      getMonsterThumbnail,
      monsterName,
      faRightLeft
    }
  },
})

export default SwitchPartyModal;
</script>

<style lang="scss" scoped>
.modal-wrapper {
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(20, 17, 36);
  padding: 40px;
  max-width: 500px;
  text-align: center;

  .party-monster {
    justify-content: space-between;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    width: 270px;

    .action {
      filter: brightness(0.5);
      cursor: pointer;

      &:hover {
        filter: brightness(1);
      }
    }
  }

  .modal-actions {
    margin-top: 25px;
  }
}
</style>