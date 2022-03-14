<template>
  <div class="monster-list-item-wrapper app-transluscent-div">
    <p class="monster-list-title">Unlocked Monsters</p>
    <perfect-scrollbar>
      <div class="monster-list-container">
        <div class="monster-item" v-for="monster in sortedMonsters" :key="monster._id">
          <div class="thumbs">
            <base-monster-thumbnail
              :src="getMonsterThumbnail(monster.name)"
              :title="monster.name" v-if="isUnlocked(monster.name)"
              @click="onMonsterSelect(monster)" />
            <fa-icon v-else class="locked-monsters" 
              :icon="faQuestion"
              title="Unknown Monster" />
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import useGlobaData from '@/hooks/store-hooks/useGlobalData';
import { computed, defineComponent } from 'vue'
import { cloneDeep } from 'lodash';
import { getMonsterThumbnail } from '@/helpers/monster.helper';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { IBaseMonster } from '@/state-management/monsters/base-monster.interface';

const MonsterListItem = defineComponent({
  emits: {
    'select-monster': (monster: IBaseMonster) => monster !== undefined
  },
  setup(_, context) {
    const { baseMonsters, accountDetails } = useGlobaData();

    const sortedMonsters = computed(() => {
      return cloneDeep(baseMonsters.value).sort((a, b) => a.name.localeCompare(b.name));
    });

    const isUnlocked = (name: string) => {
      // return accountDetails.value.unlockedMonsters.includes(name);
      return true;
    };

    const onMonsterSelect = (monster: IBaseMonster) => {
      console.log(monster);

      context.emit('select-monster', monster);
    }

    return {
      sortedMonsters,
      getMonsterThumbnail,
      isUnlocked,
      onMonsterSelect,
      faQuestion
    }
  }
})

export default MonsterListItem;
</script>

<style lang="scss" scoped>
.monster-list-item-wrapper {
  width: 300px;

  .monster-list-title {
    font-size: 18px;
    text-align: center;
    padding: 20px 0;
  }

  .ps {
    height: calc(100% - 61px);
    background: transparent;
  }

  .monster-list-container {
    display: flex;
    flex-wrap: wrap;

    .monster-item {
      width: 100px;
      margin-bottom: 25px;

      .thumbs {
        width: 50px;
        margin: auto;
        cursor: pointer;
      }

      .locked-monsters {
        width: 38px;
        height: 38px;
        padding: 5px;
        border: 1px solid white;
        filter: brightness(0.75);
      }
    }
  }
}
</style>