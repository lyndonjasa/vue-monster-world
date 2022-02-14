import { App } from "vue";
import BaseInput from './BaseInput.vue';
import BaseElement from './BaseElement.vue';
import BaseModal from './BaseModal.vue';
import BaseMonsterThumbnail from './BaseMonsterThumbnail.vue'
import BaseModalLoader from './BaseModalLoader.vue'
import BaseScreenLoader from './BaseScreenLoader.vue';
import BaseDivLoader from './BaseDivLoader.vue';
import BaseErrorModal from './BaseErrorModal.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import { faRightToBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

export const registerBaseComponents = (app: App) => {
  addIconLibrary();

  app.component('base-input', BaseInput)
  app.component('base-element', BaseElement)
  app.component('base-modal', BaseModal);
  app.component('base-monster-thumbnail', BaseMonsterThumbnail)
  app.component('base-modal-loader', BaseModalLoader)
  app.component('base-screen-loader', BaseScreenLoader);
  app.component('base-div-loader', BaseDivLoader)
  app.component('base-error-modal', BaseErrorModal);
  app.component('fa-icon', FontAwesomeIcon)
  app.use(PerfectScrollbar);
}

const addIconLibrary = (): void => {
  library.add(faRightToBracket);
  library.add(faTrashCan);
}