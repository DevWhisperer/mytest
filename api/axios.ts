import { RefreshResponseSuccess } from "@/app/api/refresh/route";
import { useAuthStore } from "@/store/authStore";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post<RefreshResponseSuccess>(
          "/api/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        useAuthStore.getState().setAccessToken(data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        const { logout } = useAuthStore.getState();
        logout();
        const currentPath = window.location.pathname;
        window.location.href = `/sign-in?callback=${encodeURIComponent(currentPath)}`;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
