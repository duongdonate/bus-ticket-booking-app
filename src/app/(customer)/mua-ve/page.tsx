"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, User, Phone, Mail, CircleCheck } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BOOKED_SEATS = ["A2", "A5", "B1", "B4", "C3"];
const MOCK_DATA = {
  date: "Chủ Nhật, 09/11",
  departureTime: "08:00",
  arrivalTime: "12:00",
  pickupLocation: "Bến xe Vũng Tàu",
  dropoffLocation: "Bến xe Miền Đông",
  customerName: "Nguyễn Văn A",
  customerPhone: "0901234567",
  customerEmail: "nguyena@email.com",
  warningTime: "07:30",
};

type View = "BUYING" | "SUCCESS";

export default function BuyTicketPage() {
  const searchParams = useSearchParams();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [view, setView] = useState<View>("BUYING");
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "cancel" | "payment" | null;
  }>({
    isOpen: false,
    type: null,
  });
  const [terms, setTerms] = useState(false);

  const tripData = {
    tripId: searchParams.get("tripId") || "",
    departure: searchParams.get("departure") || "08:00",
    arrival: searchParams.get("arrival") || "12:00",
    departureLocation: searchParams.get("departureLocation") || "Vũng Tàu",
    arrivalLocation: searchParams.get("arrivalLocation") || "TP. Hồ Chí Minh",
    price: searchParams.get("price") || "250000",
    busType: searchParams.get("busType") || "Giường nằm",
    route: `${searchParams.get("departureLocation") || "Vũng Tàu"} - ${searchParams.get("arrivalLocation") || "TP. Hồ Chí Minh"}`,
  };

  const mockPrice = Number.parseInt(tripData.price);
  const totalPrice = selectedSeats.length * mockPrice;

  const handleSeatClick = (seatId: string) => {
    if (BOOKED_SEATS.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmCancel = () => {
    setConfirmDialog({ isOpen: false, type: null });
  };

  const handleConfirmPayment = () => {
    setView("SUCCESS");
    setConfirmDialog({ isOpen: false, type: null });
  };

  // Seat grid layout (5 columns, 8 rows)
  const seats = Array.from({ length: 40 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    const rowLabel = String.fromCharCode(65 + row); // A, B, C, D, E, F, G, H
    return `${rowLabel}${col + 1}`;
  });

  if (view === "SUCCESS") {
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
              <p className="text-gray-600 text-sm">
                Mã vé: {selectedSeats.join(", ")}
              </p>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Vé của bạn
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-background/85">
      {/* Header */}
      <div className="bg-popover sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant={"link"} className="flex items-center gap-4">
            <Link
              href="/dat-ve"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </Link>
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-primary">{tripData.route}</h1>
            <p className="text-sm text-accent-foreground">{MOCK_DATA.date}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Chọn ghế</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Legend */}
                <div className="flex gap-6 flex-wrap text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-popover border border-secondary rounded"></div>
                    <span>Còn trống</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded"></div>
                    <span>Đang chọn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent rounded cursor-not-allowed"></div>
                    <span>Đã bán</span>
                  </div>
                </div>

                <Separator />

                {/* Seat Map */}
                <div className="grid grid-cols-5 gap-3 justify-center max-w-fit mx-auto">
                  {seats.map((seatId) => (
                    <Button
                      key={seatId}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={BOOKED_SEATS.includes(seatId)}
                      className={`w-10 h-10 p-0 text-xs font-semibold`}
                      variant={
                        BOOKED_SEATS.includes(seatId)
                          ? "muted"
                          : selectedSeats.includes(seatId)
                            ? "default"
                            : "outline"
                      }
                    >
                      {seatId}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                      defaultValue={MOCK_DATA.customerName}
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
                      defaultValue={MOCK_DATA.customerPhone}
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
                      defaultValue={MOCK_DATA.customerEmail}
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
            <Card>
              <CardHeader>
                <CardTitle>Thông tin đón trả</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pickup Location */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">ĐIỂM ĐÓN</h3>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Loại điểm đón</Label>
                    <RadioGroup defaultValue="ben-xe">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="ben-xe" id="pickup-ben" />
                        <Label
                          htmlFor="pickup-ben"
                          className="font-normal cursor-pointer"
                        >
                          Bến xe/VP
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="trung-chuyen"
                          id="pickup-trung"
                        />
                        <Label
                          htmlFor="pickup-trung"
                          className="font-normal cursor-pointer"
                        >
                          Trung chuyển
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="pickup-select"
                      className="text-sm font-medium"
                    >
                      Chọn điểm đón
                    </Label>
                    <Select defaultValue="ben-xe-1">
                      <SelectTrigger id="pickup-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ben-xe-1">
                          Bến xe Vũng Tàu (128 Hoàng Hoa Thám)
                        </SelectItem>
                        <SelectItem value="ben-xe-2">
                          Bến xe Thành phố (245 Trường Chinh)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Warning Message */}
                  <div className="bg-orange-50 border border-orange-200 rounded p-3">
                    <p className="text-sm text-gray-800">
                      Quý khách vui lòng có mặt tại{" "}
                      <span className="font-semibold">
                        {MOCK_DATA.pickupLocation}
                      </span>{" "}
                      <span className="font-semibold text-red-600">
                        Trước {MOCK_DATA.warningTime}
                      </span>
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Dropoff Location */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">ĐIỂM TRẢ</h3>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Loại điểm trả</Label>
                    <RadioGroup defaultValue="ben-xe">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="ben-xe" id="dropoff-ben" />
                        <Label
                          htmlFor="dropoff-ben"
                          className="font-normal cursor-pointer"
                        >
                          Bến xe/VP
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="trung-chuyen"
                          id="dropoff-trung"
                        />
                        <Label
                          htmlFor="dropoff-trung"
                          className="font-normal cursor-pointer"
                        >
                          Trung chuyển
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dropoff-select"
                      className="text-sm font-medium"
                    >
                      Chọn điểm trả
                    </Label>
                    <Select defaultValue="ben-xe-3">
                      <SelectTrigger id="dropoff-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ben-xe-3">
                          Bến xe Miền Đông (275 Đinh Bộ Lĩnh)
                        </SelectItem>
                        <SelectItem value="ben-xe-4">
                          Bến xe Miền Tây (201 Kinh Dương Vương)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Buttons */}
              </CardContent>
            </Card>
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
                    <span className="font-medium">{tripData.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian xuất bến:</span>
                    <span className="font-medium">{tripData.departure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số lượng ghế:</span>
                    <span className="font-medium">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số ghế:</span>
                    <span className="font-medium">
                      {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điểm trả khách:</span>
                    <span className="font-medium text-xs text-right">
                      {tripData.arrivalLocation}
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
                      {(selectedSeats.length * mockPrice).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      VND
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí thanh toán:</span>
                    <span className="font-medium">0 VND</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="text-lg font-bold text-orange-600">
                      {totalPrice.toLocaleString("vi-VN")} VND
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
          onConfirm={() => {
            setSelectedSeats([]);
            handleConfirmCancel();
          }}
          onCancel={handleConfirmCancel}
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
          onCancel={handleConfirmCancel}
          confirmText="Thanh toán"
          cancelText="Hủy"
          isDestructive={false}
        />
      )}
    </div>
  );
}
