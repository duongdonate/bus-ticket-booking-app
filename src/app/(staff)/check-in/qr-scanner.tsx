"use client";

import { CameraIcon, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ScannerBox from "./scanner-box";
import useToast from "@/hooks/useToast";

interface TicketData {
  code: string;
  class: string;
  purchaserName?: string;
  email?: string;
  phone?: string;
  purchaseTime?: string;
  checkInTime?: string;
  checkInStaff?: string;
}

interface QRScannerCardProps {
  onViewDetails: () => void;
}

export const parseQRData = (decodedText: string): TicketData | null => {
  if (!decodedText) return null;

  // 1. Tìm vị trí của dấu gạch ngang cuối cùng
  const lastHyphenIndex = decodedText.lastIndexOf("-");

  // 2. Kiểm tra tính hợp lệ:
  // - Không tìm thấy dấu gạch ngang (-1)
  // - Hoặc dấu gạch ngang nằm ở đầu chuỗi (index 0 -> không có mã vé)
  // - Hoặc dấu gạch ngang nằm ở cuối cùng (length - 1 -> không có hạng vé)
  if (lastHyphenIndex <= 0 || lastHyphenIndex === decodedText.length - 1) {
    return null;
  }

  // 3. Cắt chuỗi dựa trên vị trí tìm được
  // Từ đầu đến dấu gạch ngang cuối cùng
  const ticketId = decodedText.substring(0, lastHyphenIndex);

  // Từ sau dấu gạch ngang cuối cùng đến hết
  const ticketClass = decodedText.substring(lastHyphenIndex + 1);

  return {
    code: ticketId,
    class: ticketClass,
  };
};

export default function QRScannerCard({ onViewDetails }: QRScannerCardProps) {
  const toast = useToast();
  const [state, setState] = useState<"ready" | "valid" | "invalid">("ready");
  const [isCameraActive, setIsCameraActive] = useState(false); // State bật/tắt cam
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  // Hàm xử lý khi quét được QR
  const handleScan = (decodedText: string) => {
    setIsCameraActive(false); // Tắt cam ngay sau khi quét được
    toast?.showToast("Đã quét: " + decodedText);

    try {
      const ticketInfo = parseQRData(decodedText);
      if (ticketInfo) {
        // Giả lập kiểm tra vé hợp lệ hay không
        setState("valid");
        setTicketData(ticketInfo);
      } else {
        throw new Error("Sai định dạng");
      }
    } catch (e) {
      // Toast lỗi ở đây
      console.error(e);
    }
  };

  if (state === "ready") {
    return (
      <div className="flex-1 bg-card rounded-3xl p-6 flex flex-col justify-between space-y-4 drop-shadow-xl border border-gray-100">
        {/* Phần Header thông tin Ticket */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Mã vé
            </p>
            <p className="text-lg font-bold text-foreground font-mono">--</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Hạng vé
            </p>
            <p className="text-lg font-bold text-foreground">--</p>
          </div>
        </div>

        {/* Khu vực Camera / Scanner */}
        <div className="w-full flex-1 flex flex-col justify-center items-center space-y-6">
          {/* Container cho Camera - Giữ cố định size-64 để layout không nhảy */}
          <div className="size-80 bg-slate-100 rounded-2xl overflow-hidden relative shadow-inner flex items-center justify-center border-2 border-slate-200 border-dashed">
            {isCameraActive ? (
              // 1. Khi đang bật cam -> Hiển thị Component ScannerBox
              <ScannerBox
                onSuccess={handleScan}
                onError={(err) => console.log(err)}
              />
            ) : (
              // 2. Khi chưa bật cam -> Hiển thị Placeholder
              <div className="flex flex-col items-center text-slate-400">
                <CameraIcon className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm font-medium">Sẵn sàng quét</span>
              </div>
            )}
          </div>

          {/* Nút Action */}
          {!isCameraActive ? (
            <Button
              variant="default"
              className="w-full"
              onClick={() => setIsCameraActive(true)}
            >
              Bắt đầu quét
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setIsCameraActive(false)}
            >
              Hủy bỏ
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (state === "valid") {
    return (
      <div className="flex-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl p-6 flex flex-col justify-between overflow-y-auto shadow-xl">
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-center font-bold text-emerald-700 dark:text-emerald-300">
            QR hợp lệ
          </p>

          <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Mã vé</p>
              <p className="text-base font-semibold text-foreground">
                {ticketData?.code}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hạng vé</p>
              <p className="text-base font-semibold text-foreground">
                {ticketData?.class}
              </p>
            </div>
          </div>

          <p className="text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Vé tham dự
          </p>
        </div>

        <div className="space-y-2 mt-4">
          <Button
            //onClick={onCheckIn}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Check-in
          </Button>
          <Button
            //onClick={onRefresh}
            variant="outline"
            className="w-full bg-transparent"
          >
            Refresh
          </Button>
          <button
            //onClick={onViewDetails}
            className="w-full text-xs text-primary hover:text-primary/80 py-2 text-center"
          >
            Chi tiết thông tin vé
          </button>
        </div>
      </div>
    );
  }

  // Invalid state
  return (
    <div className="flex-1 bg-rose-50 dark:bg-rose-950/30 rounded-3xl p-6 flex flex-col justify-between overflow-y-auto shadow-xl">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-full">
            <XCircle className="h-10 w-10 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        <p className="text-center font-bold text-rose-700 dark:text-rose-300">
          QR không hợp lệ
        </p>

        <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Mã vé</p>
            <p className="text-base font-semibold text-foreground">
              {ticketData?.code}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hạng vé</p>
            <p className="text-base font-semibold text-foreground">
              {ticketData?.class}
            </p>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-black/30 rounded-xl p-3">
          <p className="text-center text-sm font-medium text-rose-700 dark:text-rose-300">
            Lý do
          </p>
          <p className="text-center text-sm font-semibold text-rose-600 dark:text-rose-400">
            Đã checkin
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Button
          //onClick={onOK}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white"
        >
          OK
        </Button>
        <button
          onClick={onViewDetails}
          className="w-full text-xs text-primary hover:text-primary/80 py-2 text-center"
        >
          Chi tiết thông tin vé
        </button>
      </div>
    </div>
  );
}
