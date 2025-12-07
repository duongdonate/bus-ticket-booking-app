"use client";

import React, { useState, useEffect } from "react";
import { UserTable, User } from "@/components/user-table";
import { UserDialog } from "@/components/user-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { AdminService } from "@/services/admin-service";
import { useToastContext } from "@/contexts/ToastContext";

export default function UserAccountPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [actionType, setActionType] = useState<"deactivate" | "reactivate" | null>(null);
    const [operatorMap, setOperatorMap] = useState<Record<string, string>>({});

    const toastContext = useToastContext();
    const showToast = toastContext?.showToast || ((msg: string) => console.log(msg));

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await AdminService.getUsers();
            setUsers(data.content);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            showToast("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOperators = async () => {
        try {
            const data = await AdminService.getUsers(0, 100);
            const ops = data.content.filter((u) => u.roles === "ROLE_OPERATOR");
            const map: Record<string, string> = {};
            ops.forEach((op) => {
                map[op.id] = `${op.firstname} ${op.lastname}`;
            });
            setOperatorMap(map);
        } catch (error) {
            console.error("Failed to fetch operators:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchOperators();
    }, []);

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsDialogOpen(true);
    };

    const handleSaveUser = async (userData: Partial<User>) => {
        try {
            if (selectedUser) {
                // Update existing user (if implemented)
                // await AdminService.updateUser(selectedUser.id, userData);
                // showToast("User updated successfully");
            } else {
                // Create new user
                await AdminService.createUser(userData);
                showToast("User created successfully");
            }
            fetchUsers();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to save user:", error);
            showToast("Failed to save user");
        }
    };

    const handleDeactivateClick = (user: User) => {
        setSelectedUser(user);
        setActionType("deactivate");
        setIsConfirmOpen(true);
    };

    const handleReactivateClick = (user: User) => {
        setSelectedUser(user);
        setActionType("reactivate");
        setIsConfirmOpen(true);
    };

    const handleConfirmAction = async () => {
        if (selectedUser && actionType) {
            try {
                if (actionType === "deactivate") {
                    await AdminService.deactivateUser(selectedUser.id);
                    showToast("User deactivated successfully");
                } else {
                    await AdminService.reactivateUser(selectedUser.id);
                    showToast("User reactivated successfully");
                }
                // Refresh the list after action
                fetchUsers();
            } catch (error) {
                console.error("Action failed:", error);
                showToast("Action failed");
            } finally {
                setIsConfirmOpen(false);
                setSelectedUser(null);
                setActionType(null);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage system users, roles, and permissions.
                    </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAddUser}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>

            <UserTable
                users={users}
                isLoading={isLoading}
                onDeactivate={handleDeactivateClick}
                onReactivate={handleReactivateClick}
                operatorMap={operatorMap}
            />

            <UserDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />

            <ConfirmationDialog
                isOpen={isConfirmOpen}
                title={actionType === "deactivate" ? "Deactivate User" : "Reactivate User"}
                description={
                    actionType === "deactivate"
                        ? `Are you sure you want to deactivate user "${selectedUser?.username}"? They will not be able to log in.`
                        : `Are you sure you want to reactivate user "${selectedUser?.username}"?`
                }
                onConfirm={handleConfirmAction}
                onCancel={() => setIsConfirmOpen(false)}
                confirmText={actionType === "deactivate" ? "Deactivate" : "Reactivate"}
                isDestructive={actionType === "deactivate"}
            />
        </div>
    );
}
