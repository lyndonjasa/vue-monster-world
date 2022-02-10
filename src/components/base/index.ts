import { App } from "vue";
import BaseInput from './BaseInput.vue';
import BaseElement from './BaseElement.vue';
import BaseModal from './BaseModal.vue';
import BaseMonsterThumbnail from './BaseMonsterThumbnail.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightToBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const registerBaseComponents = (app: App) => {
  addIconLibrary();

  app.component('app-base-input', BaseInput)
  app.component('app-base-element', BaseElement)
  app.component('app-base-modal', BaseModal);
  app.component('app-base-monster-thumbnail', BaseMonsterThumbnail)
  app.component('fa-icon', FontAwesomeIcon)
}

const addIconLibrary = (): void => {
  library.add(faRightToBracket);
  library.add(faTrashCan);
}