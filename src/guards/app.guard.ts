import useSession from "@/hooks/app-hooks/useSession";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function userRouteGuard(
  _: RouteLocationNormalized, 
  __: RouteLocationNormalized, 
  next: NavigationGuardNext) {
    debugger
    const { hasUserSession } = useSession();

    if (!hasUserSession.value) {
      next({ name: 'login' });
    } else {
      next();
    }
  }

export function accountRouteGuard(_: RouteLocationNormalized, 
  __: RouteLocationNormalized, 
  next: NavigationGuardNext) {
    const { hasAccountSession } = useSession();

    if (!hasAccountSession.value) {
      next('/accounts');
    } else {
      next();
    }
  }