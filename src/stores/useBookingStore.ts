import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Trip } from "@/types/Trip";
import { Seat } from "@/types/Seat";

interface BookingState {
  selectedTrip: Trip | null;
  seatMap: Seat[] | null;
  selectedSeats: any[] | [];
  isBookingSuccess: boolean;
  // Actions
  // Actions
  setSelectedTrip: (trip: any) => void;
  setSeatMap: (seatMap: any) => void;
  toggleSeat: (seat: Seat) => void;
  removeSeats: (seatIds: string[]) => void;
  cancelBooking: () => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    (set) => ({
      selectedTrip: null,
      selectedSeats: [],
      isBookingSuccess: false,

      setSelectedTrip: (trip) => set({ selectedTrip: trip }),
      setSeatMap: (seatMap) => set({ seatMap: seatMap }),

      toggleSeat: (seat) =>
        set((state) => {
          const isSelected = state.selectedSeats.some(
            (seatItem) => seatItem.position === seat.position
          );
          // Nếu đã chọn thì bỏ, chưa chọn thì thêm
          if (isSelected) {
            return {
              selectedSeats: state.selectedSeats.filter(
                (seatItem) => seatItem.position !== seat.position
              ),
            };
          }
          return { selectedSeats: [...state.selectedSeats, seat] };
        }),

      cancelBooking: () => set({ selectedSeats: [], selectedTrip: null }),
      clearBooking: () => set({ selectedSeats: [], selectedTrip: null }),
      removeSeats: (seatIds: string[]) =>
        set((state) => ({
          selectedSeats: state.selectedSeats.filter(
            (seat) => !seatIds.includes(seat.id)
          ),
        })),
    }),
    {
      name: "BookingStore", // 3. Đặt tên cho Store (quan trọng nếu bạn có nhiều store)
      enabled: process.env.NODE_ENV !== "production", // Chỉ bật ở môi trường dev
    }
  )
);
