<template>
  <div class="sprite-canvas-container" :class="{ 'blink': blink }">
    <canvas :id="canvasId" 
      class="canvas"
      :class="{ enemy: isEnemy }"
    >
    </canvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue'
import { Sprite } from '@/models/sprites/sprite';
import { SpriteStateConfig } from '@/models/sprites/sprite-state-config';
import useEnvironment from '@/hooks/useEnvironment';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  sprite: Sprite;
  spriteState: SpriteStateConfig,
  isEnemy: boolean,
  blink: boolean
  id: string;
}

const SpriteCanvas = defineComponent({
  props: {
    sprite: { required: true, type: Object as PropType<Sprite> },
    spriteState: { required: true, type: Object as PropType<SpriteStateConfig> },
    isEnemy: { required: true, type: Boolean },
    blink: Boolean,
    id: { required: false, type: String }
  },
  setup(props: Props, context) {
    const { spriteScale } = useEnvironment();

    const canvasId = computed((): string => {
      const position = props.isEnemy ? 'right' : 'left'
      const id = props.id || uuidv4();

      return `canvas-${position}-${id}`
    })
    const width = computed((): number => {
      return props.sprite.width * props.sprite.scale * spriteScale
    })
    const height = computed((): number => {
      return props.sprite.height * props.sprite.scale * spriteScale
    })
    const spriteSrc = computed(() => {
      return require(`@/assets/digimon-sprites/${props.sprite.name.replaceAll(' ', '')}.png`)
    })

    const canvas = ref<HTMLCanvasElement>(undefined);
    const spriteSheet = ref<HTMLImageElement>(new Image());
    const fpsCount = ref<number>(0);
    const currentState = ref<SpriteStateConfig>(props.spriteState);
    const canvasContext = ref<CanvasRenderingContext2D>(undefined);
    const fps = 60;
    let requestId = 0;

    const animate = () => {
      canvasContext.value.drawImage(
        spriteSheet.value,
        currentState.value.frameIndex * props.sprite.width,
        currentState.value.layer * props.sprite.height,
        props.sprite.width,
        props.sprite.height,
        0,
        0,
        width.value,
        height.value
      );

      fpsCount.value++;
      if (fpsCount.value > fps * currentState.value.animationSpeed) {
        currentState.value.frameIndex++;
        fpsCount.value = 0;
      }

      if (currentState.value.frameIndex > currentState.value.endIndex) {
        currentState.value.frameIndex = currentState.value.startIndex;

        if (currentState.value.resetAfterAnimation) {
          context.emit('reset-to-idle', true);
        }
      }
    }

    const animationFrame = () => {
      canvasContext.value.clearRect(0, 0, width.value, height.value);
      animate();
      requestId = requestAnimationFrame(animationFrame);
    }

    const resetState = () => {
      currentState.value.frameIndex = currentState.value.startIndex;
      currentState.value = props.spriteState;
    }

    onMounted(() => {
      canvas.value = document.getElementById(canvasId.value) as HTMLCanvasElement;
      canvasContext.value = canvas.value.getContext('2d');
      canvas.value.width = width.value;
      canvas.value.height = height.value;
      spriteSheet.value.src = spriteSrc.value;
      resetState();
      animationFrame();
    })

    onBeforeUnmount(() => {
      cancelAnimationFrame(requestId);
    })

    watch(() => props.spriteState, () => {
      resetState();
    })

    return {
      canvasId
    }
  }
})

export default SpriteCanvas;
</script>

<style scoped lang="scss">
.sprite-canvas-container {
  width: 300px;
  margin: auto;
  text-align: center;

  .enemy {
    transform: scaleX(-1);
  }
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    filter: brightness(0);
  }
}
</style>