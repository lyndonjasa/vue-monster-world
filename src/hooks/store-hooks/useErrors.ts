import { ErrorMutationTypes } from "@/state-management/error/error.mutations";
import { useErrorStore } from "@/state-management/error/error.store";
import { computed } from "vue";

const useErrors = () => {
  const store = useErrorStore();

  const errorMessage = computed({
    get(): string {
      return store.getters.error
    },
    set(value: string) {
      store.commit(ErrorMutationTypes.setErrorMessage, value);
    }
  })

  const throwMessage = (message: string) => {
    store.commit(ErrorMutationTypes.setErrorMessage, message);
  }

  return {
    errorMessage,
    throwMessage
  }
}

export default useErrors;