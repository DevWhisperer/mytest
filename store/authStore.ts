import axios from "axios";
import { create } from "zustand";

import { SignInRequest, SignInResponseSuccess } from "@/app/api/sign-in/route";
import { queryClient } from "@/api/react-query/queryClient";

interface AuthState {
  userId: string | null;
  login: (data: SignInRequest) => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  userId: null,

  login: async (data: SignInRequest) => {
    const response = await axios.post<SignInResponseSuccess>(
      "/api/sign-in",
      data,
    );

    get().setAccessToken(response.data.accessToken);
  },

  setAccessToken: (accessToken: string) => {
    try {
      const base64Payload = accessToken.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      localStorage.setItem("accessToken", accessToken);
      set({ userId: payload.id });
    } catch (error) {
      get().logout();
    }
  },

  logout: async () => {
    try {
      await axios.post("/api/sign-out");
    } finally {
      queryClient.clear();
      localStorage.removeItem("accessToken");
      set({ userId: null });
    }
  },
}));
