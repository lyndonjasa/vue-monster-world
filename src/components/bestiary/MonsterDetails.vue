<template>
  <div class="monster-details-wrapper app-transluscent-div">
    <perfect-scrollbar>
      <div class="test-image-container" v-if="monster">
        <img :src="imagePath" :title="monster.name" />
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
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

    return {
      imagePath
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
  }

  .test-image-container {
    width: 400px;
    height: 300px;
    background-color: yellow;
  }
}
</style>