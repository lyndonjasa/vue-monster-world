import { useRouter } from "vue-router"

const useCatchRouter = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push({ name: 'login' });
  }

  return {
    redirectToLogin
  }
}

export default useCatchRouter;