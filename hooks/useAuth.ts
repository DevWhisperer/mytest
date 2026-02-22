import { useSyncExternalStore, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const userId = useSyncExternalStore(
    useAuthStore.subscribe,
    () => useAuthStore.getState().userId,
    () => null,
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const currentUserId = useAuthStore.getState().userId;

    if (!currentUserId && savedToken) {
      useAuthStore.getState().setAccessToken(savedToken);
    }
  }, []);

  return {
    userId,
    isLoggedIn: !!userId,
  };
};
