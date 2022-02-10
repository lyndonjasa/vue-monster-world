import { LoaderMutationTypes } from "@/state-management/loader/loader.mutations";
import { useLoaderStore } from "@/state-management/loader/loader.store"
import { computed } from "vue";

const useLoaders = () => {
  const store = useLoaderStore();

  const showModalLoader = computed({
    get(): boolean {
      return store.getters.showModalLoader
    },
    set(value: boolean) {
      store.commit(LoaderMutationTypes.setModalLoader, value);
    }
  })

  const showScreenLoader = computed({
    get(): boolean {
      return store.getters.showScreenLoader
    },
    set(value: boolean) {
      store.commit(LoaderMutationTypes.setScreenLoader, value)
    }
  })

  return {
    showModalLoader,
    showScreenLoader
  }
}

export default useLoaders;