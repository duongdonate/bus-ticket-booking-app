import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/authService";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Role } from "@/types/Role";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    setAuth,
    logout: storeLogout,
    user,
    isAuthenticated,
  } = useAuthStore();

  // Hàm xử lý điều hướng dựa trên Role (Tách ra cho gọn)
  const handleRedirectByRole = (role: string) => {
    switch (role) {
      case Role.ADMIN:
        router.push("/dashboard");
        break;
      case Role.PASSENGER:
        router.push("/trips");
        break;
      default:
        router.push("/"); // Trang mặc định nếu không khớp role
        break;
    }
  };

  // 1. Login Mutation
  const loginMutation = useMutation({
    mutationFn: authApi.signin,
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data;

      // Lưu tạm token trước
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Sau khi có token, gọi ngay /me để lấy thông tin user
      // (Hoặc bạn có thể decode JWT nếu BE gửi đủ info trong token)
      try {
        const userRes = await authApi.getMe();
        setAuth(userRes.data, accessToken, refreshToken);
        console.info("Đăng nhập thành công!");

        router.push("/"); // Mặc định redirect về trang chủ
      } catch (error) {
        console.error("Lỗi lấy thông tin user sau khi login", error);
      }
    },
    onError: (error: any) => {
      console.error(error.response?.data?.error || "Đăng nhập thất bại");
    },
  });

  // 2. Register Mutation
  const registerMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      console.info("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error(error.response?.data?.error || "Đăng ký thất bại");
    },
  });

  // 3. Logout
  const logout = () => {
    storeLogout();
    queryClient.clear(); // Xóa cache React Query
    router.push("/auth/login");
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
  };
};
