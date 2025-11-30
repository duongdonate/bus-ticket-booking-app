"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserCog } from "lucide-react";
import React, { useMemo } from "react";

export interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: string;
    active: boolean;
    managedByOperatorId?: string;
}

interface UserTableProps {
    users: User[];
    isLoading?: boolean;
    onDeactivate: (user: User) => void;
    onReactivate: (user: User) => void;
    size?: number;
    page?: number;
    totalUsers?: number;
    operatorMap?: Record<string, string>;
}

export function UserTable({
    users,
    isLoading,
    onDeactivate,
    onReactivate,
    size,
    page,
    totalUsers,
    operatorMap = {},
}: UserTableProps) {
    const showIndexTable = useMemo(() => {
        const fromIndex = page && size ? (page - 1) * size + 1 : 0;
        const toIndex =
            page && size
                ? Math.min(
                    (page - 1) * size + (users ? users.length : 0),
                    totalUsers || 0
                )
                : 0;
        return `${fromIndex} - ${toIndex}`;
    }, [page, size, users, totalUsers]);

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "ROLE_ADMIN":
                return <Badge className="bg-red-500 hover:bg-red-600">Admin</Badge>;
            case "ROLE_OPERATOR":
                return <Badge className="bg-blue-500 hover:bg-blue-600">Operator</Badge>;
            case "ROLE_STAFF":
                return <Badge className="bg-green-500 hover:bg-green-600">Staff</Badge>;
            case "ROLE_PASSENGER":
                return <Badge variant="secondary">Passenger</Badge>;
            default:
                return <Badge variant="outline">{role}</Badge>;
        }
    };

    return (
        <>
            <div className="w-full flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                    Hiển thị {users.length} user
                </span>
            </div>
            <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b text-gray-700 font-medium">
                            <tr>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Full Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Manager</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td colSpan={7} className="px-6 py-4 h-12 bg-gray-50/50"></td>
                                    </tr>
                                ))
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <UserCog className="w-10 h-10 text-gray-300" />
                                            <p>No users found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{user.username}</td>
                                        <td className="px-6 py-4">
                                            {user.firstname} {user.lastname}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">{getRoleBadge(user.roles)}</td>
                                        <td className="px-6 py-4">
                                            {user.roles === "ROLE_STAFF" && user.managedByOperatorId
                                                ? operatorMap[user.managedByOperatorId] || user.managedByOperatorId
                                                : ""}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                variant={user.active ? "default" : "destructive"}
                                                className={
                                                    user.active
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200 shadow-none"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200 shadow-none"
                                                }
                                            >
                                                {user.active ? "Active" : "Inactive"}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                {user.roles !== "ROLE_ADMIN" && (
                                                    user.active ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onDeactivate(user)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            Deactivate
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onReactivate(user)}
                                                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                        >
                                                            Reactivate
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
