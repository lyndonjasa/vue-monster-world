<template>
  <input :type="type" class="base-text-input" 
    :value="modelValue" 
    :placeholder="placeholder"
    :class="{ 'error': error }"
    @input="onInput"
    @blur="onBlur"
    @change="onChange">
  <div class="validation-message-container">
    <p class="validation-message" v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop, ref } from 'vue'

interface Emits {
  'onUpdate:modelValue'(value: any): boolean
}

interface Props extends Emits {
  required: boolean;
  placeholder: string;
  modelValue: any;
  type: string;
  errorMessage: string;
  updateOn: "input" | "change" | "blur"
}

const BaseInput = defineComponent({
  props: {
    required: Boolean,
    placeholder: String,
    modelValue: { required: false } as Prop<any>,
    type: { default: 'text', type: String } as Prop<string>,
    errorMessage: String,
    updateOn: { default: 'input', type: String } as Prop<string>
  },
  emits: {
    'update:modelValue': (value: any) => value != undefined
  },
  setup(props: Props, context) {
    const error = ref<boolean>(false);

    const onInput = (event: InputEvent) => {
      if (props.updateOn === 'input') {
        updateModelValue(event.target['value'])
      }
    }

    const onBlur = (event: InputEvent) => {
      if (props.updateOn === 'blur') {
        updateModelValue(event.target['value'])
      }
    }

    const onChange = (event: InputEvent) => {
      if (props.updateOn === 'change') {
        updateModelValue(event.target['value'])
      }
    }

    const updateModelValue = (value: any): void => {
      if (!value && props.required) {
        error.value = true
      } else {
        error.value = false
      }

      context.emit('update:modelValue', value);
    }

    return {
      onInput,
      onBlur,
      onChange,
      error
    }
  }
})

export default BaseInput;
</script>

<style lang="scss">
.base-text-input {
  color: white;
  background: transparent;
  width: calc(100% - 20px);
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid white;
  outline: none;

  &.error {
    border-color: red;
  }
}

.validation-message-container {
  height: 12px;

  .validation-message {
    text-align: left;
    font-size: 12px;
    text-indent: 10px;
  }
}
</style>