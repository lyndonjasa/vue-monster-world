<template>
  <div class="monster-details-wrapper app-transluscent-div">
    <perfect-scrollbar>
      <div class="monster-profile" v-if="monster">
        <div class="profile-image">
          <img :src="imagePath" :title="monster.name" />
        </div>
        <div class="profile-description">
          <p class="monster-name">{{ monster.name }}</p>
          <p class="monster-description">
            {{ profileDescription }}
          </p>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { descriptionDictionary } from '@/helpers/monster.helper';
import { IBaseMonster } from '@/state-management/monsters/base-monster.interface'
import { computed, defineComponent, Prop } from 'vue'

interface Props {
  monster: IBaseMonster
}

const MonsterDetails = defineComponent({
  props: {
    monster: { required: false } as Prop<IBaseMonster>
  },
  setup(props: Props) {
    const imagePath = computed(() => {
      const monsterName = props.monster.name.replaceAll(' ', '');

      return require(`@/assets/profiles/${monsterName}_400x300.jpg`);
    });

    const profileDescription = computed(() => {
      return descriptionDictionary.find(dd => dd.name === props.monster.name).description
    });

    return {
      imagePath,
      profileDescription
    }
  }
})

export default MonsterDetails
</script>

<style lang="scss" scoped>
.monster-details-wrapper {
  width: calc(100% - 410px);
  padding: 30px;

  .ps {
    background-color: transparent;
    height: 100%;
    width: 100%;
  }

  .monster-profile {
    display: flex;
    justify-content: space-between;

    .profile-image {
      width: 400px;
      height: 300px;
    }

    .profile-description {
      width: calc(100% - 430px);

      .monster-name {
        font-family: Plaguard;
        font-size: 20px;
      }

      .monster-description {
        margin-top: 20px;
        font-size: 16px;
        word-wrap: break-word;
      }
    }
  }
}
</style>