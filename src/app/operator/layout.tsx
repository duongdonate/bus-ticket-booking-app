"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
  ChartColumn,
  UsersRound,
  Tickets,
  BusFront,
  MapPinned,
  DoorOpen,
} from "lucide-react";
import { SideBar, NavItemProps } from "@/components/side-bar";

interface ProfileMenuItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  bgColor?: string;
  isActive: boolean;
  action?: () => void;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    setConfirmDialog(true);
  };

  const handleDialogCancel = () => {
    setConfirmDialog(false);
  };

  const handleConfirmLogout = () => {
    setConfirmDialog(false);
    logout();
  };

  const navItems: NavItemProps[] = [
    {
      label: "Dashboard",
      icon: <ChartColumn className="size-6 " />,
      href: "/operator/dashboard",
      isActive: pathname === "/operator/dashboard",
    },
    {
      label: "Quản lý vé",
      icon: <Tickets className="size-6" />,
      href: "/operator/tickets",
      isActive: pathname === "/operator/tickets",
    },
    {
      label: "Quản lý chuyến đi",
      icon: <MapPinned className="size-6" />,
      href: "/operator/trips",
      isActive: pathname === "/operator/trips",
    },
    {
      label: "Quản lý nhân viên",
      icon: <UsersRound className="size-6" />,
      href: "/operator/staffs",
      isActive: pathname === "/operator/staffs",
    },
    {
      label: "Quản lý loại xe",
      icon: <BusFront className="size-6" />,
      href: "/operator/bus-types",
      isActive: pathname === "/operator/bus-types",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Sticky */}
        <SideBar navItems={navItems}>
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
        {confirmDialog && (
          <ConfirmationDialog
            isOpen={confirmDialog}
            title="Xác nhận đăng xuất"
            description={"Bạn có muốn đăng xuất không?"}
            onConfirm={handleConfirmLogout}
            onCancel={handleDialogCancel}
            confirmText="Đăng xuất"
            cancelText="Hủy"
            isDestructive={true}
          />
        )}
      </div>
    </div>
  );
}
