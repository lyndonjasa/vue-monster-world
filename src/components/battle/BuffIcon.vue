<template>
  <div class="buff-icon">
    <img :src="imgSource" :title="buffTitle">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Buff } from '@/models/battle/buff';

interface Props {
  buff: Buff;
}

const BuffIcon = defineComponent({
  props: {
    buff: { required: true, type: Object as PropType<Buff> }
  },
  setup(props: Props) {
    const imgSource = computed(() => {
      return require(`@/assets/icons/status/${props.buff.icon}.png`)
    });

    const buffTitle = computed((): string => {
      return props.buff.name
    });

    return {
      imgSource,
      buffTitle
    }
  },
})

export default BuffIcon;
</script>
