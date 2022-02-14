<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-body">
          <p>{{ message }}</p>
          <div class="monster-evolution">
            <div class="required-cards">
              <card-details :card="currentCard" />
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
          <button class="app-generic-btn" :disabled="disableProceed">Proceed</button>
          <button class="app-generic-btn" @click="onModalClose">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { ICard } from '@/http/responses/card-inventory.response';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { computed, defineComponent, Prop } from 'vue';
import CardDetails from '../inventory/CardDetails.vue';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

interface Emits {
  'onClose': any
}

interface Props extends Emits {
  requiredCards: number;
  type: 'evolve' | 'ascend';
  monster: DetailedMonsterResponse;
}

const MonsterAscensionModal = defineComponent({
  components: {
    CardDetails
  },
  props: {
    requiredCards: { required: true } as Prop<number>,
    type: { required: true } as Prop<'evolve' | 'ascend'>,
    monster: { required: true } as Prop<DetailedMonsterResponse>
  },
  emits: {
    'close': null
  },
  setup(props: Props, context) {
    const { cards } = useGlobaData();

    const message = computed(() => {
      return `This process will consume ${props.requiredCards} ${props.monster.name} card(s) and is irreversible. 
              Do you want this monster to ${props.type}?`
    })

    const onModalClose = () => {
      context.emit('close');
    }

    const currentCard = computed((): ICard => {
      const card = cards.value.find(c => c.monsterName === props.monster.name)

      return {
        monsterName: props.monster.name,
        quantity: card ? card.quantity : 0
      }
    })

    const disableProceed = computed(() => {
      return currentCard.value.quantity < props.requiredCards;
    })

    const resultCard = computed((): ICard => {
      if (props.monster.evolution) {
        const card = cards.value.find(c => c.monsterName === props.monster.evolution)

        return {
          monsterName: props.monster.evolution,
          quantity: card ? card.quantity : 0
        }
      }

      return undefined
    })

    return {
      message,
      onModalClose,
      currentCard,
      resultCard,
      faAnglesRight,
      disableProceed
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
        width: 230px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .change-result-icon {
          font-size: 30px;
        }
      }
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