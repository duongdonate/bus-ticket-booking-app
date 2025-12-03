"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/types/Role";
import useToast from "@/hooks/useToast";

export default function RootOperatorPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    // Logic điều hướng
    const handleRedirect = () => {
      // 1. Nếu chưa có user (chưa đăng nhập) -> Đá về Login
      if (!user) {
        router.replace("/login");
        return;
      }

      // 2. Kiểm tra Role để điều hướng
      if (user.roles.includes(Role.OPERATOR)) {
        router.replace("/operator/dashboard");
      } else {
        // Nếu không phải Operator, hiển thị thông báo lỗi và đá về Login
        toast?.error("Bạn không có quyền truy cập vào trang này.");
        router.replace("/login");
      }
    };

    handleRedirect();
  }, [user, router]);
}
