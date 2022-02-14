<template>
  <div class="account-monster-details">
    <div class="detail-actions" v-if="showDetailedView && (showEvolve || showCard || showParty || showRemove)">
      <div class="app-ingame-btn action" v-if="showParty" @click="onMonsterAdd">Add to Party</div>
      <div class="app-ingame-btn action" v-if="showRemove" @click="onMonsterRemove">Remove From Party</div>
      <div class="app-ingame-btn action" v-if="showCard" @click="showCardModal = true">Convert</div>
      <div class="app-ingame-btn action" v-if="showEvolve" @click="showAscensionModal = true">Evolve</div>
    </div>
    <div class="monster-sprite">
      <sprite-canvas :spriteState="sprites[0].getState(state)"
        :isEnemy="false"
        :sprite="sprites[0]"
        :id="monster._id"></sprite-canvas>
    </div>
    <div class="monster-details">
      <p class="monster-name" v-on="enableSelection ? { click: onMonsterSelect } : {}"
        :class="{ 'clickable' : enableSelection }"
        :title="enableSelection ? 'Click to view details' : ''">
        {{ monster.computedName }}
        <span class="expand-icon" v-if="enableSelection">... <fa-icon :icon="faUpRightAndDownLeftFromCenter" /></span>
      </p>
      <div class="summary">
        <div class="summary-key">Overview</div>
        <div class="summary-value">
          <div class="details" v-for="detail in overviewDetails" 
            :key="detail.key">
            <div class="detail-key">{{ detail.key }}</div>
            <div class="detail-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
      <div class="summary">
        <div class="summary-key">Stats</div>
        <div class="summary-value">
          <div class="details" v-for="detail in statDetails" :key="detail.key">
            <div class="detail-key">{{ detail.key }}</div>
            <div class="detail-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
      <div class="summary" v-if="showDetailedView && monster.talents.length > 0">
        <div class="summary-key">Talents</div>
        <div class="summary-value">
          <div class="skill-details" v-for="talent in monster.talents" :key="talent">
            <div class="skill-name">{{ talent }}</div>
          </div>
        </div>
      </div>
      <div class="summary">
        <div class="summary-key">Skills</div>
        <div class="summary-value" v-if="showDetailedView">
          <template v-for="skill in monster.skills" :key="skill.name">
            <div class="details flex-100 mb-15">
              <div class="skill-element"><base-element :element="skill.skillElement"></base-element></div>
              <div class="skill-name">{{ skill.name }}</div>
            </div>
            <div class="details">
              <div class="detail-key">Power</div>
              <div class="detail-value">{{ skill.power }}</div>
            </div>
            <div class="details">
              <div class="detail-key">Cost</div>
              <div class="detail-value">{{ skill.cost }}</div>
            </div>
            <div class="details">
              <div class="detail-key">Type</div>
              <div class="detail-value">{{ skillHelper.toSkillTypeString(skill.skillType) }}</div>
            </div>
            <div class="details">
              <div class="detail-key">Target</div>
              <div class="detail-value">{{ skillHelper.toTargetString(skill.skillTarget) }}</div>
            </div>
            <template v-if="skill.status">
              <div class="details">
                <div class="detail-key">Effect</div>
                <div class="detail-value">{{ skillHelper.toBuffString(skill.status.buff) }}</div>
              </div>
              <div class="details">
                <div class="detail-key">Effect Target</div>
                <div class="detail-value">{{ skill.status.target == 5 ? skillHelper.toTargetString(skill.status.target) : skillHelper.toTargetString(skill.skillTarget) }}</div>
              </div>
               <div class="details">
                <div class="detail-key">Effect Chance</div>
                <div class="detail-value">{{ skill.status.chance }}%</div>
              </div>
            </template>
            <div class="skill-description">
              {{ skill.description }}.
            </div>
          </template>
        </div>
        <div class="summary-value" v-else>
          <div class="skill-details" v-for="skill in skills" :key="skill.name">
            <div class="skill-element"><base-element :element="skill.skillElement"></base-element></div>
            <div class="skill-name">{{ skill.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <switch-party-modal 
    v-if="showSwitchPartyModal" 
    :party="currentParty" 
    @close="showSwitchPartyModal = false"
    @switch="switchToParty">
  </switch-party-modal>
  <base-modal
    v-if="showCardModal"
    :message="cardConvertMessage" 
    @accept="onCardConvert" 
    @close="showCardModal = false">
  </base-modal>
  <monster-ascension-modal
    v-if="showAscensionModal"
    :requiredCards="monsterStage.cardPrerequisite || monsterStage.maxCardBonus"
    :type="monsterStage.cardPrerequisite ? 'evolve' : 'ascend'"
    :monster="monster"
    @close="showAscensionModal = false"
    @evolved="onMonsterEvolve">
  </monster-ascension-modal>
</template>
    
<script lang="ts">
import SpriteCanvas from '@/components/battle/SpriteCanvas.vue';
import { toElementString } from '@/helpers/element.helper';
import useSpriteFactory from '@/hooks/useSpriteFactory';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { SpriteStateEnum } from '@/models/sprites/sprite-state';
import { computed, defineComponent, inject, Prop, ref } from 'vue'
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import * as skillHelper from '@/helpers/skill.helper'
import useAccount from '@/hooks/http-hooks/useAccount';
import useLoaders from '@/hooks/store-hooks/useLoaders';
import { CurrentAccount, ReloadAccountKey } from '@/injections/account.injection';
import SwitchPartyModal from './SwitchPartyModal.vue';
import { delayAction } from '@/helpers/delay.helper';
import useErrors from '@/hooks/store-hooks/useErrors';
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import MonsterAscensionModal from './MonsterAscensionModal.vue';

interface Emits {
  'onSelect-monster'(monsterId: string): boolean,
  'onUpdate-monster': any,
  'onCard-converted': any,
  'onMonster-evolved'(monsterId: string): boolean
}

interface Props extends Emits {
  monster: DetailedMonsterResponse;
  showDetailedView: boolean;
  enableSelection: boolean;
  showEvolve: boolean;
  showCard: boolean;
  showParty: boolean;
  showRemove: boolean;
}

interface Details {
  key: string;
  value: string | number;
  detailedOnly: boolean;
}

const AccountMonsterDetails = defineComponent({
  components: {
    SpriteCanvas,
    SwitchPartyModal,
    MonsterAscensionModal
  },
  props: {
    monster: { required: true } as Prop<DetailedMonsterResponse>,
    showDetailedView: { default: false } as Prop<boolean>,
    enableSelection: { default: false } as Prop<boolean>,
    showEvolve: { default: true } as Prop<boolean>,
    showCard: { default: true } as Prop<boolean>,
    showParty: { default: false } as Prop<boolean>,
    showRemove: { default: false } as Prop<boolean>
  },
  emits: {
    'select-monster': (monsterId: string) => monsterId !== undefined,
    'update-monster': null,
    'card-converted': null,
    'monster-evolved': (monsterId: string) => monsterId !== undefined
  },
  setup(props: Props, context) {
    const state = SpriteStateEnum.IDLE;
    const { showModalLoader } = useLoaders();
    const { 
      removeFromParty, 
      addToParty, 
      switchParty,
      convertMonsterToCard } = useAccount();
    const { sprites } = useSpriteFactory([props.monster.sprite]);
    const { throwMessage } = useErrors();
    const { evolutions } = useGlobaData();

    const monsterStage = computed(() => {
      return evolutions.value.find(e => e.name === props.monster.stage)
    })

    const reloadParty = inject(ReloadAccountKey);
    const account = inject(CurrentAccount);

    const currentParty = computed(() => {
      return account.value.party
    })

    const cardConvertMessage = computed(() => {
      return 'Card conversion is irreversible. Are you sure you want to convert this monster to card?'
    })

    const overviewDetailsValue: Details[] = [
      { key: 'Level', value: props.monster.level, detailedOnly: false },
      { key: 'Element', value: toElementString(props.monster.element), detailedOnly: false },
      { key: 'Current Exp', value: props.monster.currentExp, detailedOnly: true },
      { key: 'Stage', value: props.monster.stage, detailedOnly: true },
      { key: 'To Next Level', value: props.monster.expToLevel === 0 ? '----' : props.monster.expToLevel, detailedOnly: true },
      { key: 'Talent Points', value: props.monster.talentPoints, detailedOnly: true }
    ];

    if (props.monster.evolution) {
      overviewDetailsValue.push({
        key: 'Evolves To',
        value: props.monster.evolution,
        detailedOnly: true
      });
    }

    const overviewDetails = computed((): Details[] => {
      if (!props.showDetailedView) {
        return overviewDetailsValue.filter(odv => !odv.detailedOnly)
      } else {
        return overviewDetailsValue
      }
    })

    const { stats, skills } = props.monster
    const statDetailsValue: Details[] = [
      { key: 'Health', value: stats.health, detailedOnly: false },
      { key: 'Health Regen', value: stats.healthRegen + '%', detailedOnly: true },
      { key: 'Mana', value: stats.mana, detailedOnly: false },
      { key: 'Mana Regen', value: stats.manaRegen + '%', detailedOnly: true },
      { key: 'Offense', value: stats.offense, detailedOnly: true },
      { key: 'Defense', value: stats.defense, detailedOnly: true },
      { key: 'Crit Rate', value: stats.critRate + '%', detailedOnly: true },
      { key: 'Speed', value: stats.speed, detailedOnly: true },
      { key: 'Crit Damage', value: stats.critDamage + '%', detailedOnly: true }
    ]

    const statDetails = computed((): Details[] => {
      if (!props.showDetailedView) {
        return statDetailsValue.filter(odv => !odv.detailedOnly)
      } else {
        return statDetailsValue
      }
    })

    const onMonsterSelect = (): void => {
      context.emit('select-monster', props.monster._id);
    }

    const onMonsterRemove = async () => {
      showModalLoader.value = true;
      await removeFromParty(props.monster._id);
      await reloadParty();
      showModalLoader.value = false;
      context.emit('update-monster')
    }

    const showSwitchPartyModal = ref<boolean>(false);
    const onMonsterAdd = async () => {
      if (account.value.party.length < 3) {
        addMonsterToParty();
      } else {
        showSwitchPartyModal.value = true;
      }
    }

    const addMonsterToParty = async () => {
      showModalLoader.value = true;
      await addToParty(props.monster._id);
      await reloadParty();
      showModalLoader.value = false;
      context.emit('update-monster')
    }

    const switchToParty = async (switchedMonsterId: string) => {
      showSwitchPartyModal.value = false;
      showModalLoader.value = true;
      await switchParty(props.monster._id, switchedMonsterId);
      await reloadParty();
      showModalLoader.value = false;
      context.emit('update-monster')
    }

    const showCardModal = ref<boolean>(false);
    const onCardConvert = async () => {
      showCardModal.value = false;
      await delayAction(500);
      
      showModalLoader.value = true;
      try {
        await convertMonsterToCard(props.monster._id);
      } catch (error) {
        throwMessage(error.response.data);
      } finally {
        showModalLoader.value = false;
      }

      context.emit('card-converted');
    }

    const showAscensionModal = ref<boolean>(false);
    const onMonsterEvolve = async () => {
      showAscensionModal.value = false;
      context.emit('monster-evolved', props.monster._id)
    }

    return {
      state,
      sprites,
      overviewDetails,
      statDetails,
      skills,
      onMonsterSelect,
      skillHelper,
      faUpRightAndDownLeftFromCenter,
      onMonsterRemove,
      onMonsterAdd,
      switchToParty,
      currentParty,
      showSwitchPartyModal,
      cardConvertMessage,
      showCardModal,
      onCardConvert,
      onMonsterEvolve,
      showAscensionModal,
      monsterStage
    }
  },
})

export default AccountMonsterDetails;
</script>

<style lang="scss" scoped>
.account-monster-details {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid white;
  border-radius: 3px;
  padding: 20px 10px;
  margin-bottom: 15px;

  .detail-actions {
    flex: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 15px;
    
    .action {
      margin-left: 15px;
      padding: 10px 15px;
    }
  }

  .monster-sprite {
    width: 240px;
    min-height: 150px;
    display: flex;
    align-items: flex-start;
    margin-right: 20px;

    .sprite-canvas-container {
      margin: 0 auto !important;
    }
  }

  .monster-details {
    width: calc(100% - 260px);
    align-self: stretch;
    font-size: 15px;

    .monster-name {
      font-weight: bold;

      &.clickable {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .summary {
      margin: 10px 0 15px 0;
      display: flex;
      align-items: flex-start;

      .summary-key {
        width: 100px;
      }

      .summary-value {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 50px);

        .details {
          display: flex;
          flex-basis: 50%;
          margin-bottom: 5px;

          &.flex-100 {
            flex-basis: 100%;
          }
        }

        .detail-key {
          color: rgba(255, 255, 255, 0.75);
          width: 130px;
        }

        .detail-value {
          width: 130px;
        }

        .skill-details {
          display: flex;
          flex-basis: 50%;
          margin-bottom: 5px;
        }
        
        .skill-name {
          align-self: flex-end;
          margin-left: 10px;
        }

        .detailed-skill-summary {
          display: flex;
          flex: 100%;
          margin-bottom: 25px;
        }
      }
    }
  }

  .mb-15 {
    margin-bottom: 15px !important;
  }

  .skill-description {
    margin-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 10px;
    width: 100%;
    font-size: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
}
</style>