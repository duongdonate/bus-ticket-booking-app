import { axiosPrivate } from "@/lib/axiosClient";
import { User } from "@/components/user-table";

interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const AdminService = {
    // Users
    getUsers: async (page: number = 0, size: number = 10): Promise<PageResponse<User>> => {
        const response = await axiosPrivate.get<PageResponse<User>>("/admin/users", {
            params: { page, size },
        });
        return response.data;
    },

    getUser: async (userId: string): Promise<User> => {
        const response = await axiosPrivate.get<User>(`/admin/users/${userId}`);
        return response.data;
    },

    deactivateUser: async (userId: string): Promise<void> => {
        await axiosPrivate.patch(`/admin/users/${userId}/deactivate`);
    },

    reactivateUser: async (userId: string): Promise<void> => {
        await axiosPrivate.patch(`/admin/users/${userId}/reactivate`);
    },

    updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
        const response = await axiosPrivate.put<User>(`/users/${userId}`, data);
        return response.data;
    },

    createUser: async (data: Partial<User>): Promise<User> => {
        const payload = { ...data, password: "123456" };

        if (payload.managedByOperatorId === "") {
            delete payload.managedByOperatorId;
        }

        const response = await axiosPrivate.post<User>("/admin/users", payload);
        return response.data;
    },

    // Tickets
    getTickets: async () => {
        const response = await axiosPrivate.get("/admin/tickets");
        return response.data;
    },

    getTicket: async (ticketId: string) => {
        const response = await axiosPrivate.get(`/admin/tickets/${ticketId}`);
        return response.data;
    },

    cancelTicket: async (ticketId: string) => {
        const response = await axiosPrivate.post(`/admin/tickets/${ticketId}/cancel`);
        return response.data;
    },
};
