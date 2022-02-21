<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-body">
          <div class="talent-groups-container">
            <p class="talent-tree-title">Talent Hierarchy</p>
            <div class="talent-group" v-for="talentGroup in talentGroups" :key="talentGroup.group">
              <p>{{ talentGroup.group }}</p>
              <div class="talent" v-for="talent in talentGroup.talents" :key="talent._id">
                <div class="downward-icon">
                  <fa-icon :icon="faAnglesDown" />
                </div>
                <div class="talent-name">
                  <talent-icon :talent="talent" 
                    :active="talentAcquired(talent.name)"
                    :unlocked="prerequisiteAcquired(talent.prerequisite)"
                    @click="selectedTalent = talent" />
                </div>
              </div>
            </div>
          </div>
          <div class="talent-details-container">
            <talent-details :talent="selectedTalent" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="app-generic-btn" @click="onTalentUpdate">Save</button>
          <button class="app-generic-btn" @click="onModalClose">Close</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { DetailedMonsterResponse } from '@/http/responses/detailed-monster.response';
import { TalentCategory } from '@/models/talents/talent-category.enum';
import { ITalent } from '@/state-management/talents/talent.interface';
import { computed, defineComponent, Prop, ref } from 'vue'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import TalentIcon from './TalentIcon.vue';
import { TalentEnum } from '@/models/talents/talent.enum';
import TalentDetails from './TalentDetails.vue';
interface Emits {
  'onClose': any,
  'onTalent-updated': any
}

interface Props extends Emits {
  monster: DetailedMonsterResponse
}

const MonsterTalentsModal = defineComponent({
  components: {
    TalentIcon,
    TalentDetails
  },
  props: {
    monster: { required: true } as Prop<DetailedMonsterResponse>
  },
  emits: {
    'close': null,
    'talent-updated': null
  },
  setup(props: Props, context) {
    const { talents } = useGlobaData();

    const selectedTalent = ref<ITalent>(undefined);

    const talentAcquired = (talent: string) => {
      const enumValue = TalentEnum[talent.toUpperCase().replace('-', '_')];
      return props.monster.talents.includes(enumValue);
    }

    const prerequisiteAcquired = (preRequisite: string) => {
      if (!preRequisite) return true;

      const enumValue = TalentEnum[preRequisite.toUpperCase().replace('-', '_')];
      return props.monster.talents.includes(enumValue);
    }

    const talentGroups = computed((): { group: string, talents: ITalent[] }[] => {
      const talentCategories = talents.value.map(t => t.category).filter((v, i, s) => s.indexOf(v) === i);

      return talentCategories.map(tc => {
        return {
          group: getGroupName(tc),
          talents: talents.value.filter(t => t.category === tc)
        }
      })
    })

    const getGroupName = (category: number): string => {
      switch (category) {
        case TalentCategory.OFFENSE:
          return 'Offense'
        case TalentCategory.HEALTH:
          return 'Health'
        case TalentCategory.MANA:
          return 'Mana'
        case TalentCategory.DEFENSE:
          return 'Defense'
        case TalentCategory.SPEED:
          return 'Speed'
        default:
          throw 'Unsupported category'
      }
    }

    const onModalClose = () => {
      context.emit('close');
    }

    const onTalentUpdate = () => {
      // TODO: add monster talent update here

      context.emit('talent-updated');
    }

    return {
      onModalClose,
      onTalentUpdate,
      talentAcquired,
      prerequisiteAcquired,
      talentGroups,
      faAnglesDown,
      selectedTalent
    }
  },
})

export default MonsterTalentsModal;
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

  .modal-body {
    text-align: center;
    display: flex;
    width: 800px;

    .talent-groups-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .talent-tree-title {
        flex-basis: 100%;
      }

      .talent-group {
        margin-top: 25px;
        width: 100px;

        p {
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .talent:first-of-type {
          .downward-icon {
            display: none;
          }
        }

        .talent  {
          margin-top: 10px;

          .downward-icon {
            margin-bottom: 10px;
          }
        }
      }
    }

    .talent-details-container {
      width: 200px;
    }
  }

  .modal-actions {
    margin-top: 25px;
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 15px;
    }
  }
}
</style>