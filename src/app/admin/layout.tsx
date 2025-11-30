import React from "react";
import { SideBar, NavItemProps } from "@/components/side-bar";
import { Users, LayoutDashboard, Bus, Map } from "lucide-react";

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
    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="w-64 p-4 hidden md:block">
                <SideBar navItems={adminNavItems} />
            </div>
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    );
}
