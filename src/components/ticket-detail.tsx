"use client";

import { Button } from "@/components/ui/button";
import { Download, MapPin, User, CreditCard, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  onPrint: () => void;
  onDownload: () => void;
  onCancel: () => void;
}

export function TicketDetailModal({
  isOpen,
  onClose,
  ticketId,
}: TicketDetailModalProps) {
  if (!ticketId) return null;

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: vi });
  };

  const formatDateTime = (date: Date, time: string) => {
    return `${time} ${formatDate(date)}`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: {
        text: "Đã xác nhận",
        color: "bg-green-50 text-green-700 border-green-200",
      },
      cancelled: {
        text: "Đã hủy",
        color: "bg-red-50 text-red-700 border-red-200",
      },
      completed: {
        text: "Hoàn thành",
        color: "bg-blue-50 text-blue-700 border-blue-200",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: {
        text: "Đã thanh toán",
        color: "bg-green-50 text-green-700 border-green-200",
      },
      pending: {
        text: "Chờ thanh toán",
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      },
      failed: {
        text: "Thanh toán thất bại",
        color: "bg-red-50 text-red-700 border-red-200",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-6xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Chi tiết vé</h2>
              <p className="text-sm text-gray-600 font-normal mt-1">
                Mã vé:{" "}
                <span className="font-semibold">{ticketId.ticketCode}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onPrint}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                In vé
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Tải về
              </Button>
            </div>
          </div>

          <DialogPrimitive.Close className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="space-y-6 pt-4">
            {/* Status Bar */}
            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-2">Trạng thái vé</p>
                {getStatusBadge(ticketId.status)}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Trạng thái thanh toán
                </p>
                {getPaymentStatusBadge(ticketId.paymentStatus)}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Ngày đặt vé</p>
                <p className="text-base font-semibold">
                  {formatDateTime(booking.bookingDate, booking.bookingTime)}
                </p>
              </div>
            </div>

            {/* Trip Information */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Thông tin chuyến đi
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nhà xe</p>
                    <p className="text-base font-semibold">
                      {booking.trip.busCompany}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Loại xe</p>
                    <p className="text-base font-semibold">
                      {booking.trip.busType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Biển số xe</p>
                    <p className="text-base font-semibold">
                      {booking.trip.licensePlate}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tuyến đường</p>
                    <p className="text-base font-semibold">
                      {booking.trip.route.from} → {booking.trip.route.to}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ngày đi</p>
                      <p className="text-base font-semibold">
                        {formatDate(booking.trip.departureDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Thời gian</p>
                      <p className="text-base font-semibold">
                        {booking.trip.departureTime} -{" "}
                        {booking.trip.arrivalTime}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Thời gian hành trình
                    </p>
                    <p className="text-base font-semibold">
                      {booking.trip.duration}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Điểm đón</p>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">
                      {booking.trip.pickupPoint}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Điểm trả</p>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-900">
                      {booking.trip.dropoffPoint}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Thông tin hành khách
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                  <p className="text-base font-semibold">
                    {booking.passenger.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                  <p className="text-base font-semibold">
                    {booking.passenger.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-base font-semibold">
                    {booking.passenger.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Seat Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">Thông tin ghế</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Số ghế
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        Giá vé
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.seats.map((seat, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-6 py-3 text-sm font-medium">
                          {seat.seatNumber}
                        </td>
                        <td className="px-6 py-3 text-sm text-right font-semibold">
                          {seat.price.toLocaleString("vi-VN")}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                Thông tin thanh toán
              </h3>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold">
                      {booking.pricing.subtotal.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  {booking.pricing.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Giảm giá</span>
                      <span className="font-semibold">
                        -{booking.pricing.discount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  )}
                  {booking.pricing.serviceFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí dịch vụ</span>
                      <span className="font-semibold">
                        {booking.pricing.serviceFee.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-3 flex justify-between">
                    <span className="text-base font-bold">Tổng cộng</span>
                    <span className="text-xl font-bold text-orange-600">
                      {booking.pricing.total.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Phương thức thanh toán
                      </span>
                      <span className="font-semibold">
                        {booking.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                Lưu ý quan trọng:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Vui lòng có mặt tại điểm đón trước giờ xuất bến 15 phút</li>
                <li>Mang theo CMND/CCCD để đối chiếu thông tin khi lên xe</li>
                <li>Liên hệ tổng đài nếu cần hỗ trợ: 1900 6067</li>
                <li>Chính sách hủy vé: Được hủy trước 24h, phí 10% giá vé</li>
              </ul>
            </div>

            {/* Action Buttons */}
            {booking.status === "confirmed" && (
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Hủy vé
                </Button>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
