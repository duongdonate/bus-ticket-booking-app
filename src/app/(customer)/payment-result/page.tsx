"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/useBookingStore";
import { useBookingSeat } from "@/hooks/useBookingSeat";

export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); // 'success' hoặc 'failed'
  const orderId = searchParams.get("orderId");
  const orderInfo = searchParams.get("orderInfo");
  console.log(orderInfo);
  // Có thể dùng để lưu trữ tripId hoặc thông tin khác

  const tripId = orderInfo?.split(" ").pop(); // Lấy tripId từ orderInfo ở cuối chuỗi
  console.log("tripId:", tripId);

  const confirmBooking = (status: string) => {
    if (status === "success") {
      // xem vé
      router.push("/profile/lich-su-mua-ve");
    }

    if (status === "failed") {
      router.push(`/trips/${tripId}`);
    }
  };

  // Có thể gọi thêm API để check lại trạng thái đơn hàng từ DB cho chắc chắn (Double check)
  // useEffect(() => { ... }, [orderId]);

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleCheck className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-10">
                Chúc mừng bạn đã thanh toán thành công vé
              </h2>
              <div className="space-y-1">
                <p className="text-primary text-sm">
                  Mã đơn hàng: <strong>{orderId}</strong>
                </p>
                <p className="text-card-foreground text-sm">
                  Mã chuyến đi: <strong>{tripId}</strong>
                </p>
              </div>
            </div>
            <Button className="w-full" onClick={() => confirmBooking(status)}>
              Xem Vé của bạn
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleOff className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-10">
                Rất tiếc, thanh toán vé của bạn đã thất bại
              </h2>
              <div className="space-y-1">
                <p className="text-primary text-sm">
                  Mã đơn hàng: <strong>{orderId}</strong>
                </p>
                <p className="text-card-foreground text-sm">
                  Mã chuyến đi: <strong>{tripId}</strong>
                </p>
              </div>
            </div>
            <Button className="w-full" onClick={() => confirmBooking(status)}>
              Đặt Lại Vé
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
