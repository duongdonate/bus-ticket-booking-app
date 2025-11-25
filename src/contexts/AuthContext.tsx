"use client";

import { useEffect, useState, createContext, ReactNode } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { authApi } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import Loading from "@/app/loading";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Lấy user và các hàm từ store
  const { user, setAuth, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // State để biết quá trình load User ban đầu đã xong chưa
  const [isInitializing, setIsInitializing] = useState(true);

  // --- EFFECT 1: KHỞI TẠO AUTH (Chỉ chạy 1 lần khi mount) ---
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // Nếu không có token, coi như là khách -> Xong quá trình init
      if (!accessToken || !refreshToken) {
        setIsInitializing(false);
        return;
      }

      try {
        // Gọi API lấy thông tin user mới nhất
        const { data: userData } = await authApi.getMe();
        setAuth(userData, accessToken, refreshToken);
      } catch (error) {
        console.error("Token hết hạn hoặc lỗi:", error);
        logout(); // Xóa sạch store và storage nếu lỗi
      } finally {
        // Dù thành công hay thất bại, cũng đánh dấu là đã init xong
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [setAuth, logout]);

  // --- EFFECT 2: BẢO VỆ ROUTE (Chạy khi pathname đổi hoặc user đổi) ---
  useEffect(() => {
    // Nếu đang init auth thì chưa check vội, đợi init xong đã
    if (isInitializing) return;

    // 1. Tìm rule khớp với đường dẫn hiện tại
    const activeRule = Routes.find(
      (rule) =>
        rule.path === pathname ||
        (rule.path !== "/" && pathname.startsWith(rule.path))
    );

    // 2. Nếu không có rule hoặc rule là Public -> Cho qua
    if (!activeRule || activeRule.isPublic) {
      return;
    }

    // 3. Kiểm tra User (Lấy từ Store thay vì LocalStorage)
    if (!user) {
      // Chưa login mà vào trang private -> Đá về login
      router.push("/login");
      return;
    }

    // 4. Kiểm tra Role
    // Giả sử user.roles là string "ROLE_PASSENGER" như data bạn đưa
    // Nếu user.roles là mảng, logic này vẫn cần activeRule.roles.some(...)
    if (activeRule.roles && activeRule.roles.length > 0) {
      if (!activeRule.roles.some((role) => user.roles.includes(role))) {
        // User có login nhưng không đúng quyền -> Đá về trang chủ
        router.push("/login");
      }
    }
  }, [pathname, router, user, isInitializing]);

  // --- RENDER ---

  // Trong khi đang init auth, hiện loading để tránh nháy giao diện (flash content)
  // Hoặc tránh việc redirect sai khi user chưa kịp load vào store
  if (isInitializing) {
    return <Loading />;
  }

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
