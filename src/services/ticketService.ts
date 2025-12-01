import { create } from "zustand";
import { axiosPrivate, axiosPublic } from "@/lib/axiosClient";
import { Ticket, TicketStatus } from "@/types/Ticket";

export interface SeatAPIRequest {
  tripId: string;
  deckId: string;
  selectedSeat: string;
}

export const ticketApi = {
  bookTickets: (data: { bookingSeats: SeatAPIRequest[] }) =>
    axiosPrivate.post("/tickets", data),

  // Do page query here bắt đầu từ 0
  getAllTickets: (page: any, size: any) => {
    if (page === undefined || size === undefined) {
      return axiosPrivate.get("/tickets");
    }
    return axiosPrivate.get("/tickets", {
      params: { page: page - 1, size, sort: "createdAt,desc" },
    });
  },

  getTicketById: (id: string) => axiosPrivate.get<Ticket>(`/tickets/${id}`),
  getQRCode: (id: string) =>
    axiosPrivate.get(`/tickets/${id}/qrcodes`, { responseType: "blob" }),
  validateTicket: (id: string, method: string) =>
    axiosPrivate.post(`/ticket-validations`, { id: id, method: method }),
};
