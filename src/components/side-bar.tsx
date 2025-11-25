import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  bgColor?: string;
  isActive?: boolean;
}

export function NavItem({
  href,
  icon,
  label,
  bgColor = "bg-gray-100",
  isActive = false,
}: NavItemProps) {
  const enhancedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        className: cn(icon.props.className, isActive && "text-primary"),
      } as React.HTMLAttributes<HTMLElement>)
    : icon;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded-lg transition-colors overflow-hidden ${
        isActive
          ? "bg-orange-50 border-l-4 border-primary rounded-l-none"
          : "hover:bg-gray-50"
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

export interface NavMenu {
  children?: React.ReactNode;
  navItems: NavItemProps[];
}

export function SideBar({ navItems, children }: NavMenu) {
  const pathname = usePathname();
  return (
    <aside className="bg-popover rounded-lg shadow-sm p-4 sticky top-0 z-20 flex flex-col justify-between">
      {/* Menu Items */}
      <div className="space-y-1 mb-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </div>
      {/* Custom Button */}
      <div className="space-y-1">{children}</div>
    </aside>
  );
}
