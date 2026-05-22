"use client";
import React from "react";
import { SideBar, NavItemProps } from "@/components/side-bar";
import { Users, LayoutDashboard, Bus, Map, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const adminNavItems: NavItemProps[] = [
  {
    href: "/admin/user-account",
    icon: <Users className="w-5 h-5" />,
    label: "User Management",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth(); // Giả sử bạn có hook useAuth để quản lý xác thực

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-full">
      <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Sticky */}
        <SideBar navItems={adminNavItems}>
          <Button
            variant={"destructive"}
            className="w-full"
            onClick={handleLogout}
          >
            <DoorOpen className="size-5" />
            Đăng xuất
          </Button>
        </SideBar>
        {/* Main Content */}
        <main className="lg:col-span-3 py-4 px-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
