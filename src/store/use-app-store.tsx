import { getToken } from "@/lib/cookies";
import { useGlobalAction, useGlobalStore } from "./store-hooks";

export function useAppStore() {
  const token = getToken();

  // User-related state and actions
  const { user, isAuthenticated } = useGlobalStore((state) => state?.auth);
  const { setUser, clearUser } = useGlobalAction((actions) => actions?.auth);
  const userId = user?.id;

  const notUser = !user || !token;

  return {
    user,
    userId,
    setUser,
    clearUser,
    isAuthenticated,
    notUser,
  };
}
