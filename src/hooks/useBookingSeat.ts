// hooks/useBookingTicket.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useBookingStore } from "@/stores/useBookingStore";
import { tripApi } from "@/services/tripService";
import { ticketApi } from "@/services/ticketService";
import { SeatMapState } from "@/components/trip-seat-map";
import { SeatMap } from "@/types/Seat";

export const useBookingSeat = (tripId: string) => {
  const queryClient = useQueryClient();

  // 1. Lấy state và action từ Zustand
  const {
    selectedSeats,
    toggleSeat,
    setSelectedTrip,
    removeSeats,
    cancelBooking,
    isBookingSuccess,
    clearBooking,
  } = useBookingStore();

  // 2. Query: Lấy thông tin chuyến đi (Trip Details)
  const tripQuery = useQuery({
    queryKey: ["trip-details", tripId],
    queryFn: () => tripApi.getPublishedTripById(tripId),
    enabled: !!tripId,
    staleTime: 5 * 60 * 1000, // Giữ cache 5 phút
  });

  // 3. Query: Lấy sơ đồ ghế (Seat Map) - Cần refetch thường xuyên hơn để cập nhật ghế đã bán
  const seatMapQuery = useQuery({
    queryKey: ["trip-seats", tripId],
    queryFn: () => tripApi.getSeatsByTripId(tripId),
    enabled: !!tripId,
    refetchInterval: 10000, // Tự động cập nhật sơ đồ ghế mỗi 10s (polling)
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    // Chỉ chạy khi có dữ liệu seatMap và đang có ghế được chọn
    if (!seatMapQuery || selectedSeats.length === 0) return;
    const seatMap = new SeatMapState(seatMapQuery.data?.data as SeatMap);
    // Tìm các ghế đang chọn mà trong seatMap mới nhất trạng thái KHÁC 'AVAILABLE'
    const blockedSeats = seatMap.blockedSeats;
    console.log("Ghế bị khóa từ server:", blockedSeats);

    const seatsToRemove = selectedSeats
      .filter((Sseat) => blockedSeats.some((bSeat) => bSeat.id === Sseat.id))
      .map((seat) => seat.id);
    console.log("Seats to remove:", seatsToRemove);

    if (seatsToRemove.length > 0) {
      console.log("Phát hiện xung đột ghế:", seatsToRemove);
      removeSeats(seatsToRemove);
    }
  }, [seatMapQuery.data, selectedSeats, removeSeats]);

  // 4. Effect: Sync thông tin trip vào Store (để dùng làm biến toàn cục như bạn muốn)
  useEffect(() => {
    if (tripQuery.data) {
      setSelectedTrip(tripQuery.data.data);
    }
  }, [tripQuery.data, setSelectedTrip]);

  // 5. Mutation: Xử lý Mua vé
  const bookingMutation = useMutation({
    mutationFn: async (payload: { tripId: string; selectedSeats: any }) => {
      // Biến đổi danh sách ghế thành danh sách các Promise gọi API
      const promises = payload.selectedSeats.map((seat: any) => {
        return ticketApi.bookTickets({
          tripId: payload.tripId,
          deckId: seat.deckId,
          selectedSeat: seat.position,
        });
      });

      // Gửi tất cả request cùng lúc và chờ tất cả xong
      // Nếu 1 cái thất bại -> Promise.all sẽ throw lỗi ngay (Xem phần lưu ý bên dưới để xử lý kỹ hơn)
      return Promise.all(promises);
    },
    onSuccess: (data) => {
      console.log("Đặt vé thành công!");
      clearBooking(); // Reset store
      queryClient.invalidateQueries({ queryKey: ["trip-seats", tripId] }); // Refresh lại sơ đồ ghế ngay lập tức
      // Redirect hoặc mở modal success ở đây
    },
    onError: (error: any) => {
      console.error(
        "Đặt vé thất bại:",
        error.response?.data?.error || error.message
      );
    },
  });

  // 6. Tính toán tổng tiền (Derived State)
  const totalPrice = useMemo(() => {
    if (!tripQuery.data || selectedSeats.length === 0) return 0;
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }, [selectedSeats]);

  // 7. Hàm xử lý Mua vé (Wrapper)
  const handleBooking = () => {
    if (selectedSeats.length === 0) return;

    // Giả sử deckId lấy từ seatMapQuery hoặc logic riêng.
    // Ở đây giả định lấy deckId đầu tiên hoặc xử lý logic map ghế với deck

    bookingMutation.mutate({
      tripId,
      selectedSeats: selectedSeats,
    });
  };

  return {
    // Data
    tripDetails: tripQuery.data,
    seatMap: seatMapQuery.data,
    selectedSeats,
    totalPrice,
    clearBooking,
    cancelBooking,

    // Loading States
    isLoading: tripQuery.isLoading || seatMapQuery.isLoading,
    isBooking: bookingMutation.isPending, // Đổi tên từ isLoading cho rõ nghĩa
    isSuccess: isBookingSuccess,

    // Actions
    toggleSeat,
    handleBooking,

    // Errors
    error: tripQuery.error || seatMapQuery.error,
  };
};
