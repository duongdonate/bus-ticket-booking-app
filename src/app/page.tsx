"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/types/Role";

export default function RootPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Logic điều hướng
    const handleRedirect = () => {
      // 1. Nếu chưa có user (chưa đăng nhập) -> Đá về Login
      if (!user) {
        router.replace("/login");
        return;
      }

      // 2. Kiểm tra Role để điều hướng
      // Lưu ý: So sánh chuỗi chính xác dựa trên JSON bạn cung cấp trước đó
      // Nếu logic role phức tạp hơn, bạn có thể dùng switch-case
      if (user.roles.includes(Role.PASSENGER)) {
        router.replace("/trips");
      } else if (user.roles.includes(Role.OPERATOR)) {
        router.replace("/operator/dashboard");
      } else if (user.roles.includes(Role.STAFF)) {
        router.replace("/staff/check-in");
      } else {
        // Trường hợp role lạ hoặc user mới tạo chưa có quyền
        // Có thể đẩy về trang profile hoặc thông báo lỗi
        router.replace("/profile");
      }
    };

    handleRedirect();
  }, [user, router]);
}
