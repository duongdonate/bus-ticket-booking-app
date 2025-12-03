"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookingSeat } from "@/hooks/useBookingSeat";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronLeft, CircleCheck, Mail, Phone, User } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Trip } from "@/types/Trip";
import TripSeatMap from "./trip-seat-map";
import { TripState } from "./trip-card";
import { useRouter } from "next/navigation";

interface Props {
  tripId: string;
  shippingFee?: number;
}

export default function BookingContainer({ tripId, shippingFee = 0 }: Props) {
  // 1. React Query: Lắng nghe searchParams thay đổi -> Gọi axiosPublic
  const {
    tripDetails,
    seatMap,
    selectedSeats,
    totalPrice,
    isLoading,
    isBooking, // Trạng thái đang gọi API mua vé
    toggleSeat,
    handleBooking, // Hàm gọi API mua vé (đã xử lý Promise.all)
    clearBooking,
    cancelBooking,
    isSuccess,
  } = useBookingSeat(tripId);

  const router = useRouter();
  const { user } = useAuthStore();
  const [tripData, setTripData] = useState<TripState | null>(null);

  useEffect(() => {
    if (tripDetails) {
      setTripData(new TripState(tripDetails.data));
    }
  }, [tripDetails]);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "cancel" | "payment" | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [terms, setTerms] = useState(false);
  const handleDialogCancel = () => {
    setConfirmDialog({ isOpen: false, type: null });
  };

  const handleConfirmCancel = () => {
    setConfirmDialog({ isOpen: false, type: null });
    cancelBooking();
    router.back();
  };

  const handleConfirmPayment = () => {
    setConfirmDialog({ isOpen: false, type: null });
    handleBooking();
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (!tripDetails || !seatMap) return <div>Lỗi kết nối!</div>;
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleCheck className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Chúc mừng bạn đã thanh toán thành công vé
              </h2>
            </div>
            <Button asChild className="w-full">
              <Link href="/profile/my-tickets">Vé của bạn</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-popover sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            onClick={cancelBooking}
            asChild
            variant={"link"}
            className="flex items-center gap-4"
          >
            <Link
              href="/trips"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </Link>
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-primary">
              {tripData?.routeName}
            </h1>
            <p className="text-sm text-accent-foreground">
              {tripData?.departureTimeString} - {tripData?.arrivalTimeString}
            </p>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Scrollable */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Seat Selection */}
            <TripSeatMap
              seatMapData={seatMap.data}
              onToggleSeat={toggleSeat}
              selectedSeats={selectedSeats}
            />

            {/* Card 2: Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Họ và tên
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      defaultValue={user?.firstname + " " + user?.lastname}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Số điện thoại
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      defaultValue={user?.phone}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={terms}
                    onCheckedChange={(checked: any | boolean) =>
                      setTerms(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Chấp nhận điều khoản
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Pickup/Dropoff Info */}
          </div>

          {/* Right Column - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {/* Trip Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin lượt đi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuyến xe:</span>
                    <span className="font-medium">{tripData?.routeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian xuất bến:</span>
                    <span className="font-medium">
                      {tripData?.arrivalTimeString}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số lượng ghế:</span>
                    <span className="font-medium">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số ghế:</span>
                    <span className="font-medium">
                      {selectedSeats.length > 0
                        ? selectedSeats.map((seat) => seat.id).join(", ")
                        : "_"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điểm trả khách:</span>
                    <span className="font-medium text-xs text-right">
                      {tripData?.departureLocation}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Price Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết giá</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá vé lượt đi:</span>
                    <span className="font-medium">
                      {totalPrice.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí thanh toán:</span>
                    <span className="font-medium">
                      {shippingFee.toLocaleString("vi-VN")} VND
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="text-lg font-bold text-orange-600">
                      {(totalPrice + shippingFee).toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1 shadow-md"
                  onClick={() =>
                    setConfirmDialog({ isOpen: true, type: "cancel" })
                  }
                >
                  Hủy
                </Button>
                <Button
                  className="flex-1 shadow-md"
                  variant={"default"}
                  disabled={selectedSeats.length === 0 || !terms}
                  onClick={() =>
                    setConfirmDialog({ isOpen: true, type: "payment" })
                  }
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Dialogs */}
      {confirmDialog.type === "cancel" && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          title="Hủy đặt vé"
          description="Bạn có chắc chắn muốn hủy? Thông tin sẽ không được lưu."
          onConfirm={handleConfirmCancel}
          onCancel={handleDialogCancel}
          confirmText="Hủy"
          cancelText="Tiếp tục"
        />
      )}

      {confirmDialog.type === "payment" && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          title="Xác nhận thanh toán"
          description={`Bạn sắp thanh toán ${totalPrice.toLocaleString("vi-VN")} VND cho ${selectedSeats.length} ghế. Bạn có chắc chắn?`}
          onConfirm={handleConfirmPayment}
          onCancel={handleDialogCancel}
          confirmText="Thanh toán"
          cancelText="Hủy"
          isDestructive={false}
        />
      )}
    </>
  );
}
