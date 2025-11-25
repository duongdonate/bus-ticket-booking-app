import { create } from "zustand";
import { axiosPrivate, axiosPublic } from "@/lib/axiosClient";

export const ticketApi = {
  bookTickets: (data: {
    tripId: string;
    deckId: string;
    selectedSeat: string;
  }) => axiosPrivate.post("/tickets", data),

  // Do page query here bắt đầu từ 0
  getAllTickets: (page: any, size: any) => {
    if (page === undefined || size === undefined) {
      return axiosPrivate.get("/tickets");
    }
    return axiosPrivate.get("/tickets", {
      params: { page: page - 1, size, sort: "createdAt,desc" },
    });
  },

  getTicketById: (id: string) => axiosPrivate.get(`/tickets/${id}`),
};
