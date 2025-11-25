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
import { useAuthStore } from "@/stores/useAuthStore";
import { useParams } from "next/navigation";
import { tripApi } from "@/services/tripService";
import { useQuery } from "@tanstack/react-query";
import { Trip } from "@/types/Trip";
import BookingContainer from "@/components/booking-container";

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
  const { tripId } = useParams();

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
  //   const tripData = {
  //     tripId: "",
  //     departure: "08:00",
  //     arrival: "12:00",
  //     departureLocation: "Vũng Tàu",
  //     arrivalLocation: "TP. Hồ Chí Minh",
  //     price: "250000",
  //     busType: "Giường nằm",
  //     route: `${"Vũng Tàu"} - ${"TP. Hồ Chí Minh"}`,
  //   };

  const handleSeatClick = (seatId: string) => {
    if (BOOKED_SEATS.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleDialogCancel = () => {
    setConfirmDialog({ isOpen: false, type: null });
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
            <Button asChild className="w-full">
              <Link href="/profile/lich-su-mua-ve">Vé của bạn</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-background/85">
      <BookingContainer tripId={tripId as string} />
    </div>
  );
}
