<template>
  <teleport to="div#app">
    <div class="app-modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-body">
          <div class="talent-groups-container">
            <p class="talent-tree-title">Talent Hierarchy</p>
            <div class="talent-group" v-for="talentGroup in talentGroups" :key="talentGroup.group">
              <p>{{ talentGroup.group }}</p>
            </div>
          </div>
          <div class="talent-details-container">
            Details Here
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
import { computed, defineComponent, Prop } from 'vue'

interface Emits {
  'onClose': any,
  'onTalent-updated': any
}

interface Props extends Emits {
  monster: DetailedMonsterResponse
}

const MonsterTalentsModal = defineComponent({
  props: {
    monster: { required: true } as Prop<DetailedMonsterResponse>
  },
  emits: {
    'close': null,
    'talent-updated': null
  },
  setup(_: Props, context) {
    const { talents } = useGlobaData();

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
      talentGroups
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
      }
    }

    .talent-details-container {
      width: 150px;
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