"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  DoorOpen,
  Tickets,
  SquareArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SideBar, NavItemProps } from "@/components/side-bar";

interface ProfileMenuItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  bgColor?: string;
  isActive: boolean;
  action?: () => void;
}

function ProfileMenuItem({
  action,
  href,
  icon,
  label,
  bgColor,
  isActive,
}: ProfileMenuItemProps) {
  const enhancedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        className: cn(icon.props.className, isActive && "text-primary"),
      } as React.HTMLAttributes<HTMLElement>)
    : icon;

  return (
    <Link
      href={href ? href : "#"}
      onClick={action ? action : undefined}
      className={`flex items-center gap-3 p-2 rounded-lg transition-colors overflow-hidden ${
        isActive
          ? "bg-orange-50 border-l-4 border-primary rounded-l-none"
          : "hover:bg-gray-50 text-primary"
      }`}
    >
      <>
        <div
          className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center ${isActive && "text-primary"}`}
        >
          {enhancedIcon}
        </div>
        <span
          className={`font-medium text-sm ${isActive ? "text-primary" : "text-gray-700"}`}
        >
          {label}
        </span>
      </>
    </Link>
  );
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
      label: "Thông tin người dùng",
      icon: <CircleUserRound className="size-6 " />,
      href: "/profile",
      isActive: pathname === "/profile",
    },
    {
      label: "Vé của tôi",
      icon: <Tickets className="size-6" />,
      href: "/profile/my-tickets",
      isActive: pathname === "/profile/my-tickets",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Sticky */}
        <SideBar navItems={navItems}>
          <Button variant={"secondary"} className="w-full" asChild>
            <Link href={"/trips"}>
              <SquareArrowLeft className="size-5" />
              Quay lại Trang Đặt Vé
            </Link>
          </Button>
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
