"use client";

import { CameraIcon, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ScannerBox from "@/components/staff/scanner-box";
import useToast from "@/hooks/useToast";
import { Ticket, TicketStatus, TicketValidationStatus } from "@/types/Ticket";
import {
  useValidationTicket,
  ValidateTicketProps,
} from "@/hooks/useValidationTicket";
import { Input } from "../ui/input";

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

interface TicketDataQRCode {
  ticketId: string;
  selectedSeat: string;
}

export const parseQRData = (decodedText: string): TicketDataQRCode | null => {
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
    ticketId: ticketId,
    selectedSeat: ticketClass,
  };
};

export default function QRScannerCard({ onViewDetails }: QRScannerCardProps) {
  const {
    validationStatus,
    validateTicket,
    ticketId,
    resetValidation,
    manualCheck,
  } = useValidationTicket();
  const [isCameraActive, setIsCameraActive] = useState(false); // State bật/tắt cam
  const [ticketInfo, setTicketInfo] = useState<TicketDataQRCode | null>(null);
  //const [ticketData, setTicketData] = useState<TicketData | null>(null);

  // Hàm xử lý khi quét được QR
  const handleScan = (decodedText: string) => {
    //setIsCameraActive(false); // Tắt cam ngay sau khi quét được

    try {
      setTicketInfo(parseQRData(decodedText));
      if (ticketInfo) {
        // Giả lập kiểm tra vé hợp lệ hay không
        const { ticketId, selectedSeat } = ticketInfo;
        validateTicket({ ticketId, method: "MANUAL" } as ValidateTicketProps);
      } else {
        throw new Error("Sai định dạng");
      }
    } catch (e) {
      // Toast lỗi ở đây

      console.error(e);
    }
  };

  const handleReset = () => {
    setTicketInfo(null);
    resetValidation();
  };

  if (validationStatus === TicketValidationStatus.ALREADY_USED) {
    return (
      <div className="flex-1 bg-card rounded-3xl p-6 flex flex-col justify-between space-y-4 drop-shadow-xl border border-gray-100">
        {/* Phần Header thông tin Ticket */}
        <div className="space-y-4">
          <div>
            <p className="text-lg text-muted-foreground uppercase tracking-wider">
              QUÉT QR CHECK-IN
            </p>
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

          <Button
            variant="outline"
            className="w-full"
            onClick={() => manualCheck()}
          >
            Nhập mã vé thủ công
          </Button>
        </div>
      </div>
    );
  }

  if (validationStatus === TicketValidationStatus.MANUAL_CHECK) {
    return (
      <div className="flex-1 bg-card rounded-3xl p-6 flex flex-col justify-between space-y-4 drop-shadow-xl border border-gray-100">
        {/* Phần Header thông tin Ticket */}
        <div className="space-y-4">
          <div>
            <p className="text-lg text-muted-foreground uppercase tracking-wider">
              NHẬP MÃ VÉ THỦ CÔNG
            </p>
          </div>
        </div>

        {/* Khu vực Nhập mã vé */}
        <div className="w-full flex-1 flex flex-col justify-center items-center space-y-6">
          <Input
            type="text"
            placeholder="Nhập mã vé tại đây"
            className="w-full h-12"
            value={ticketInfo?.ticketId || ""}
            onChange={(e) =>
              setTicketInfo({
                ticketId: e.target.value,
                selectedSeat: ticketInfo?.selectedSeat || "",
              })
            }
          />
          <div className="w-full flex flex-col space-y-3">
            <Button
              variant="default"
              onClick={() =>
                validateTicket({
                  ticketId: ticketInfo?.ticketId as string,
                  method: "MANUAL",
                } as ValidateTicketProps)
              }
            >
              Xác nhận
            </Button>
            <Button variant="secondary" onClick={() => resetValidation()}>
              Quét QR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (validationStatus === TicketValidationStatus.VALID) {
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
                {ticketInfo?.ticketId}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hạng vé</p>
              <p className="text-base font-semibold text-foreground">
                {ticketInfo?.selectedSeat}
              </p>
            </div>
          </div>

          <p className="text-center text-md font-medium text-emerald-700 dark:text-emerald-300">
            Vé hợp lệ
          </p>
        </div>

        <div className="space-y-2 mt-4">
          <Button
            onClick={() => handleReset()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Check-in
          </Button>
          <Button
            variant="link"
            //onClick={onViewDetails}
            className="w-full text-xs text-secondary-foreground py-2 text-center"
          >
            Chi tiết thông tin vé
          </Button>
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
              {ticketInfo?.ticketId}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hạng vé</p>
            <p className="text-base font-semibold text-foreground">
              {ticketInfo?.selectedSeat}
            </p>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-black/30 rounded-xl p-3">
          <p className="text-center text-sm font-semibold text-rose-600 dark:text-rose-400">
            Vé đã được sử dụng hoặc đã hết hạn
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Button
          onClick={() => handleReset()}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white"
        >
          Refresh
        </Button>
        <Button
          variant="link"
          //onClick={onViewDetails}
          className="w-full text-xs text-secondary-foreground py-2 text-center"
        >
          Chi tiết thông tin vé
        </Button>
      </div>
    </div>
  );
}
