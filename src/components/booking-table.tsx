"use client";

import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  ticketCode: string;
  seatNumbers: string[];
  route: {
    from: string;
    to: string;
  };
  departureDate: string;
  departureTime: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
  bookingStatus: "confirmed" | "cancelled" | "completed";
}

interface BookingTableProps {
  bookings: Booking[];
  isLoading: boolean;
  onViewDetail: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
}

export function BookingTable({
  bookings,
  isLoading,
  onViewDetail,
  onCancel,
}: BookingTableProps) {
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return status;
    }
  };

  const getBookingStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return "text-green-600";
      case "cancelled":
      case "failed":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      case "completed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Mã vé
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Số vé
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Tuyến đường
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Ngày đi
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Số tiền
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Thanh toán
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-20 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-20">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <div className="w-20 h-20 mb-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-full h-full"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          strokeWidth="1.5"
                        />
                        <path d="M3 9h18" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <p className="text-base font-medium">No Data</p>
                    <p className="text-sm mt-1">Không có dữ liệu lịch sử mua vé</p>
                  </div>
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-5 font-semibold text-sm whitespace-nowrap">
                    {booking.ticketCode}
                  </td>
                  <td className="px-6 py-5 text-sm whitespace-nowrap">
                    {booking.seatNumbers.join(", ")}
                  </td>
                  <td className="px-6 py-5 text-sm whitespace-nowrap">
                    {booking.route.from} - {booking.route.to}
                  </td>
                  <td className="px-6 py-5 text-sm whitespace-nowrap">
                    {booking.departureTime} {booking.departureDate}
                  </td>
                  <td className="px-6 py-5 font-semibold text-sm whitespace-nowrap">
                    {booking.amount.toLocaleString("vi-VN")}đ
                  </td>
                  <td className={`px-6 py-5 text-sm font-medium whitespace-nowrap ${getStatusColor(booking.paymentStatus)}`}>
                    {getPaymentStatusText(booking.paymentStatus)}
                  </td>
                  <td className={`px-6 py-5 text-sm font-medium whitespace-nowrap ${getStatusColor(booking.bookingStatus)}`}>
                    {getBookingStatusText(booking.bookingStatus)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetail(booking.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50 h-7 px-4 w-24"
                      >
                        Chi tiết
                      </Button>
                      {booking.bookingStatus === "confirmed" && onCancel && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onCancel(booking.id)}
                          className="text-xs text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 h-7 px-4 w-24"
                        >
                          Hủy
                        </Button>
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
  );
}