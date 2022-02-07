import { App } from "vue";
import BaseInput from './BaseInput.vue';

export const registerBaseComponents = (app: App) => {
  app.component('app-base-input', BaseInput)
}