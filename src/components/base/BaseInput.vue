<template>
  <input :type="type" class="base-text-input" :value="modelValue" :placeholder="placeholder" @input="onInputChange">
</template>

<script lang="ts">
import { defineComponent, Prop, PropType } from 'vue'

interface Emits {
  'onUpdate:modelValue'(value: any): boolean
}

interface Props extends Emits {
  required: boolean;
  placeholder: string;
  modelValue: any;
  type: string;
}

const BaseInput = defineComponent({
  props: {
    required: Boolean,
    placeholder: String,
    modelValue: { required: false } as Prop<any>,
    type: { default: 'text', type: String } as Prop<string>
  },
  emits: {
    'update:modelValue': (value: any) => value != undefined
  },
  setup(_, context) {
    const onInputChange = (event: InputEvent) => {
      context.emit('update:modelValue', event.target['value'])
    }

    return {
      onInputChange
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
}
</style>