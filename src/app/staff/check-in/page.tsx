"use client";

import { useState } from "react";
import { X, Camera, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import QRScannerCard from "../../../components/staff/qr-scanner";
import TicketDetailsModal from "../../../components/staff/ticket-details-modal";
import { useAuth } from "@/hooks/useAuth";

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

export default function StaffCheckInPage() {
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-card px-4 py-3 flex items-center space-x-2 justify-between sticky top-0 z-10 shadow-lg">
        <div className="text-md font-medium text-foreground text-wrap">
          Nhân viên: {user?.firstname + " " + user?.lastname}
        </div>
        <Button
          onClick={() => logout()}
          variant="destructive"
          size="icon"
          className="h-12 w-fit px-4 rounded-full flex items-center"
        >
          <DoorOpen className="size-6" />
          Đăng xuất
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
