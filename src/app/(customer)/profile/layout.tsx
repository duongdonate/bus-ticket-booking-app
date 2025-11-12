"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileMenuItemProps {
  href: string;
  icon: string;
  label: string;
  bgColor: string;
  isActive: boolean;
}

function ProfileMenuItem({
  href,
  icon,
  label,
  bgColor,
  isActive,
}: ProfileMenuItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
        isActive ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"
      }`}
    >
      <div
        className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-xl`}
      >
        {icon}
      </div>
      <span className={`font-medium text-sm ${isActive ? "text-blue-600" : ""}`}>
        {label}
      </span>
    </Link>
  );
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 justify-center max-w-6xl mx-auto">
          {/* Sidebar - Sticky */}
          <aside className="w-56 flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                {/* Menu Items */}
                <ProfileMenuItem
                  href="/profile/thong-tin-chung"
                  icon="👤"
                  label="Thông tin tài khoản"
                  bgColor="bg-orange-100"
                  isActive={pathname === "/profile/thong-tin-chung"}
                />
                <ProfileMenuItem
                  href="/profile/lich-su-mua-ve"
                  icon="🕒"
                  label="Lịch sử mua vé"
                  bgColor="bg-blue-100"
                  isActive={pathname === "/profile/lich-su-mua-ve"}
                />
                <ProfileMenuItem
                  href="/logout"
                  icon="🚪"
                  label="Đăng xuất"
                  bgColor="bg-red-100"
                  isActive={false}
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}