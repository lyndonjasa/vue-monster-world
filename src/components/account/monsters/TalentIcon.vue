<template>
  <div class="talent-icon-wrapper">
    <div class="talent-icon-container active" :class="categoryName.toLowerCase()">
      <object :data="svgPath" type="image/svg+xml" class="talent-svg"></object>
    </div>
    <div class="talent-icon-overlay active" :title="talent.name"></div>
  </div>
</template>

<script lang="ts">
import { TalentCategory } from '@/models/talents/talent-category.enum'
import { ITalent } from '@/state-management/talents/talent.interface'
import { computed, defineComponent, Prop } from 'vue'

interface Props {
  talent: ITalent
}

const TalentIcon = defineComponent({
  props: {
    talent: { required: true } as Prop<ITalent>
  },
  setup(props: Props) {
    const svgPath = computed(() => {
      const category = getGroupName(props.talent.category);
      return require(`../../../assets/icons/talents/${category.toLowerCase()}/${props.talent.name}.svg`)
    })

    const categoryName = computed(() => {
      switch (props.talent.category) {
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
    })

    const onTalentSelect = () => {
      console.log('selected');
    }

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

    return {
      svgPath,
      categoryName,
      onTalentSelect
    }
  }
})

export default TalentIcon
</script>

<style lang="scss" scoped>
.talent-icon-wrapper {
  height: 50px;

  &:hover {
    > * {
      -webkit-box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.5); 
      box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.5); 
    }
  }

  .talent-icon-container {
    margin: auto;
    width: 30px;
    padding: 10px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 999px;

    &.active {
      -webkit-box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.5); 
      box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.5); 
    }

    .talent-svg {
      width: 30px;
    }
  }

  .talent-icon-overlay {
    width: 30px;
    padding: 10px;
    height: 30px;
    border-radius: 999px;
    position: relative;
    top: -50px;
    left: 25px;
    z-index: 2;
    cursor: pointer;
    background-color: transparent;
  }
}
</style>