import { App } from "vue";
import BaseInput from './BaseInput.vue';
import BaseElement from './BaseElement.vue';
import BaseModal from './BaseModal.vue';
import BaseMonsterThumbnail from './BaseMonsterThumbnail.vue'
import BaseModalLoader from './BaseModalLoader.vue'
import BaseScreenLoader from './BaseScreenLoader.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightToBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const registerBaseComponents = (app: App) => {
  addIconLibrary();

  app.component('base-input', BaseInput)
  app.component('base-element', BaseElement)
  app.component('base-modal', BaseModal);
  app.component('base-monster-thumbnail', BaseMonsterThumbnail)
  app.component('base-modal-loader', BaseModalLoader)
  app.component('base-screen-loader', BaseScreenLoader);
  app.component('fa-icon', FontAwesomeIcon)
}

const addIconLibrary = (): void => {
  library.add(faRightToBracket);
  library.add(faTrashCan);
}