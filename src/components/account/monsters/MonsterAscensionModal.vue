<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        <template v-if="sprites.length < 1">
          <div class="modal-body">
            <p>{{ message }}</p>
            <div class="monster-evolution">
              <div class="required-cards">
                <card-details :card="requestedCard" />
              </div>
              <div class="ascension-result">
              <card-details :card="currentCard" :hideQuantity="true" />
              <div class="change-result-icon">
                <fa-icon :icon="faAnglesRight" />
              </div>
              <card-details :card="resultCard" :hideQuantity="true" />
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="app-generic-btn" :disabled="disableProceed" @click="evolveMonster">Proceed</button>
            <button class="app-generic-btn" @click="onModalClose">Cancel</button>
          </div>
        </template>
        <div class="evolution-animation" v-if="sprites.length > 0">
          <sprite-canvas
            v-if="showAnimation"
            :sprite="sprites[0]"
            :spriteState="sprites[0].getState(state)"
            :blink="true"
            :isEnemy="false"
          ></sprite-canvas>
          <sprite-canvas
            v-if="!showAnimation"
            :sprite="sprites[1]"
            :spriteState="sprites[1].getState(state)"
            :blink="blinkAnimation"
            :isEnemy="false"
          ></sprite-canvas>
          <button class="app-generic-btn" v-if="!blinkAnimation" @click="notifyEvolution">Close</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { ICard } from '@/http/responses/card-inventory.response';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { computed, defineComponent, Prop, ref } from 'vue';
import CardDetails from '../inventory/CardDetails.vue';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { Sprite } from '@/models/sprites/sprite';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import SpriteCanvas from '@/components/battle/SpriteCanvas.vue';
import { delayAction } from '@/helpers/delay.helper';
import useAccount from '@/hooks/http-hooks/useAccount';
import useErrors from '@/hooks/store-hooks/useErrors';

interface Emits {
  'onClose': any,
  'onEvolved': any
}

interface Props extends Emits {
  requiredCards: number;
  type: 'evolve' | 'ascend';
  monster: DetailedMonsterResponse;
}

const MonsterAscensionModal = defineComponent({
  components: {
    CardDetails,
    SpriteCanvas
  },
  props: {
    requiredCards: { required: true } as Prop<number>,
    type: { required: true } as Prop<'evolve' | 'ascend'>,
    monster: { required: true } as Prop<DetailedMonsterResponse>
  },
  emits: {
    'close': null,
    'evolved': null
  },
  setup(props: Props, context) {
    const { evolveMonster: ascendMonster } = useAccount();
    const { cards, baseMonsters } = useGlobaData();
    const { throwMessage } = useErrors();

    const message = computed(() => {
      return `This process will consume ${props.requiredCards} ${props.monster.name} card(s) and is irreversible. 
              Do you want this monster to ${props.type}?`
    })

    const blinkAnimation = ref<boolean>(true);
    const state = SpriteStateEnum.IDLE;

    const sprites = ref<Sprite[]>([]);
    const showAnimation = ref<boolean>(true);

    const evolveMonster = async () => {
      const oldMonster = baseMonsters.value.find(m => m.name === props.monster.name);
      const newMonster = baseMonsters.value.find(m => m.name === props.monster.evolution);

      const rawSprites = [oldMonster.sprite, newMonster.sprite]
      const { sprites: animations } = useSpriteFactory(rawSprites);
      
      sprites.value = animations;

      try {
        await delayAction(3000);
        await ascendMonster(props.monster._id);
        showAnimation.value = false;
        blinkAnimation.value = true;
        await delayAction(3000);
        blinkAnimation.value = false;
      } catch (error) {
        throwMessage(error.response.data);
        context.emit('close');
      }
    }

    const onModalClose = () => {
      context.emit('close');
    }

    const notifyEvolution = () => {
      context.emit('evolved');
    }

    const requestedCard = computed((): ICard => {
      const card = cards.value.find(c => c.monsterName === props.monster.name)

      return {
        monsterName: props.monster.name,
        quantity: card ? card.quantity : 0
      }
    })

    const currentCard = computed((): ICard => {
      const card = cards.value.find(c => c.monsterName === props.monster.name)

      return {
        monsterName: props.monster.name,
        quantity: card ? card.quantity : 0,
        cardDisplayName: props.monster.computedName
      }
    })

    const disableProceed = computed(() => {
      return currentCard.value.quantity < props.requiredCards;
    })

    const resultCard = computed((): ICard => {
      if (props.type == 'evolve') {
        const card = cards.value.find(c => c.monsterName === props.monster.evolution)

        return {
          monsterName: props.monster.evolution,
          quantity: card ? card.quantity : 0
        }
      } else {
        const targetBonus = props.monster.appliedCards + 1
        const card = cards.value.find(c => c.monsterName === props.monster.name)

        return {
          monsterName: props.monster.name,
          quantity: card ? card.quantity : 0,
          cardDisplayName: `${props.monster.name} +${targetBonus}`
        }
      }
    })

    return {
      message,
      onModalClose,
      evolveMonster,
      requestedCard,
      currentCard,
      resultCard,
      faAnglesRight,
      disableProceed,
      blinkAnimation,
      sprites,
      showAnimation,
      state,
      notifyEvolution
    }
  }
})

export default MonsterAscensionModal
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

  .modal-body {
    text-align: center;
    font-size: 18px;

    .monster-evolution {
      margin-top: 40px;
      display: flex;
      justify-content: space-around;

      .ascension-result {
        min-width: 230px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .change-result-icon {
          font-size: 30px;
        }
      }
    }
  }

  .evolution-animation {
    text-align: center;

    button {
      margin-top: 25px;
    }
  }

  .modal-actions {
    margin-top: 25px;
    display: flex;
    justify-content: center;

    button {
      margin: 0 15px;
    }
  }
}
</style>