import { create } from "zustand";
import { User } from "@/types/User";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setAccessToken: (token: string) => void; // Dùng khi refresh token thành công
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      accessToken: null, // Trong thực tế có thể init từ localStorage nếu muốn persist cơ bản
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) => {
        // Lưu vào localStorage để persist khi F5 (tuỳ chọn)
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },

      setAccessToken: (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken });
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "AuthStore", // 3. Đặt tên cho Store (quan trọng nếu bạn có nhiều store)
      enabled: process.env.NODE_ENV !== "production", // Chỉ bật ở môi trường dev
    }
  )
);
