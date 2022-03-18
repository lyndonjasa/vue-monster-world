<template>
  <img :src="elementIcon" :title="elementTitle" :style="customSize" />
</template>

<script lang="ts">
import { ElementEnum } from "@/models/skills/element.enum";
import { computed, defineComponent, Prop } from "vue";
import { toElementString } from '@/helpers/element.helper'

interface Props {
  element: number;
  size: number;
}

const BaseElement = defineComponent({
  props: {
    element: { required: true } as Prop<number>,
    size: { required: false, default: 0 } as Prop<number>
  },
  setup(props: Props) {
    const elementIcon = computed(() => {
      let icon = ''
      switch (props.element) {
        case ElementEnum.FIRE:
          icon = 'fire'
          break;
        case ElementEnum.ELECTRIC:
          icon = 'electric'
          break;
        case ElementEnum.ROCK:
          icon = 'rock'
          break;
        case ElementEnum.WATER:
          icon = 'water'
          break;
        case ElementEnum.WIND:
          icon = 'wind'
          break;
        default:
          icon = 'non-elemental'
          break;
      }

      return require(`@/assets/icons/elements/${icon}.png`)
    })

    const elementTitle = toElementString(props.element);

    const customSize = computed(() => {
      if (props.size !== 0) {
        return {
          'height': `${props.size}px`,
          'width': `${props.size}px`
        }
      } else {
        return {};
      }
    });

    return {
      elementIcon,
      elementTitle,
      customSize
    }
  }
})

export default BaseElement
</script>