"use client";

import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import QRScannerCard from "../../../components/staff/qr-scanner";
import TicketDetailsModal from "../../../components/staff/ticket-details-modal";

type ScanState = "ready" | "valid" | "invalid";

interface TicketData {
  code: string;
  class: string;
  purchaserName: string;
  email: string;
  phone: string;
  purchaseTime: string;
  checkInTime?: string;
  checkInStaff?: string;
}

const mockTickets = {
  "APTGX24-VIP": {
    code: "APTGX24",
    class: "VIP Ticket",
    purchaserName: "Nguyễn Hà",
    email: "nguyenha@gmail.com",
    phone: "0959 994 595",
    purchaseTime: "2023-09-10 12:45:56",
    checkInTime: "2023-09-29 12:45:56",
    checkInStaff: "Đông Nguyễn",
  },
};

export default function StaffCheckInPage() {
  const [scanState, setScanState] = useState<ScanState>("ready");
  const [checkedInCount, setCheckedInCount] = useState(40);
  const [totalCount] = useState(1200);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();

  const handleSimulateScan = () => {
    // Simulate alternating between valid and invalid states for demo
    if (scanState === "ready") {
      setScanState("valid");
      setTicketData(mockTickets["APTGX24-VIP"]);
    } else if (scanState === "valid") {
      setScanState("invalid");
      setTicketData(mockTickets["APTGX24-VIP"]);
    } else {
      setScanState("ready");
      setTicketData(null);
    }
  };

  const handleQRScan = (qrData: string) => {
    // Parse QR format: {mã vé}-{hạng vé}
    const parts = qrData.split("-");
    if (parts.length !== 2) {
      console.log({
        title: "QR Error",
        description: "Parse Failed - Invalid QR format",
        variant: "destructive",
      });
      return;
    }

    const ticketInfo = mockTickets[qrData as keyof typeof mockTickets];
    if (!ticketInfo) {
      console.log({
        title: "QR Error",
        description: "Ticket not found",
        variant: "destructive",
      });
      return;
    }

    // Simulate: first scan is valid, second is invalid
    if (Math.random() > 0.5) {
      setScanState("valid");
    } else {
      setScanState("invalid");
    }
    setTicketData(ticketInfo);
  };

  return (
    <div className="w-full h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-muted px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="text-sm font-medium text-foreground">
          Đã checkin:{" "}
          <span className="font-bold">
            {checkedInCount}/{totalCount}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col max-w-md mx-auto px-4 py-4">
        {/* Status & Action Area (60% height) */}
        <div className="h-[60%] flex-1 flex flex-col w-full">
          <QRScannerCard onViewDetails={() => setShowModal(true)} />
        </div>
      </div>

      {/* Ticket Details Modal */}
      {showModal && (
        <TicketDetailsModal
          open={showModal}
          onOpenChange={setShowModal}
          //ticketData={ticketData}
          //isInvalid={scanState === "invalid"}
        />
      )}
    </div>
  );
}
