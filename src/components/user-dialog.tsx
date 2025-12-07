"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form-item";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User } from "@/components/user-table";
import { useEffect, useState } from "react";
import { AdminService } from "@/services/admin-service";
import { UserRound, Mail, Type, Shield, UserCog } from "lucide-react";

interface UserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: Partial<User>) => void;
    user?: User | null;
}

export function UserDialog({
    isOpen,
    onClose,
    onSave,
    user,
}: UserDialogProps) {
    const [formData, setFormData] = useState<Partial<User>>({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        roles: "ROLE_OPERATOR",
        managedByOperatorId: "",
    });
    const [operators, setOperators] = useState<User[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchOperators();
        }
    }, [isOpen]);

    const fetchOperators = async () => {
        try {
            // Fetch users with large size to get operators
            // Ideally backend should have an endpoint for this
            const data = await AdminService.getUsers(0, 100);
            const ops = data.content.filter((u) => u.roles === "ROLE_OPERATOR");
            setOperators(ops);
        } catch (error) {
            console.error("Failed to fetch operators:", error);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: user.roles,
                managedByOperatorId: user.managedByOperatorId || "",
            });
        } else {
            setFormData({
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                roles: "ROLE_OPERATOR",
                managedByOperatorId: "",
            });
        }
    }, [user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        setFormData((prev) => ({ ...prev, roles: value }));
    };

    const handleManagerChange = (value: string) => {
        setFormData((prev) => ({ ...prev, managedByOperatorId: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
                    <DialogDescription>
                        {user
                            ? "Make changes to the user profile here."
                            : "Create a new user profile. Only Operators and Staff can be added."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <FormItem label="Username" htmlFor="username" icon={<UserRound className="w-4 h-4" />}>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!!user}
                            placeholder="Enter username"
                        />
                    </FormItem>

                    <div className="grid grid-cols-2 gap-4">
                        <FormItem label="First Name" htmlFor="firstname" icon={<Type className="w-4 h-4" />}>
                            <Input
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="First name"
                            />
                        </FormItem>
                        <FormItem label="Last Name" htmlFor="lastname" icon={<Type className="w-4 h-4" />}>
                            <Input
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Last name"
                            />
                        </FormItem>
                    </div>

                    <FormItem label="Email" htmlFor="email" icon={<Mail className="w-4 h-4" />}>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                    </FormItem>

                    <FormItem label="Role" htmlFor="role" icon={<Shield className="w-4 h-4" />}>
                        <Select
                            value={formData.roles}
                            onValueChange={handleRoleChange}
                        >
                            <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ROLE_OPERATOR">Operator</SelectItem>
                                <SelectItem value="ROLE_STAFF">Staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormItem>

                    {formData.roles === "ROLE_STAFF" && (
                        <FormItem label="Managed By" htmlFor="manager" icon={<UserCog className="w-4 h-4" />}>
                            <Select
                                value={formData.managedByOperatorId}
                                onValueChange={handleManagerChange}
                            >
                                <SelectTrigger className="pl-10">
                                    <SelectValue placeholder="Select an operator" />
                                </SelectTrigger>
                                <SelectContent>
                                    {operators.map((op) => (
                                        <SelectItem key={op.id} value={op.id}>
                                            {op.firstname} {op.lastname} ({op.username})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
