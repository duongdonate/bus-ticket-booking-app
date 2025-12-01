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

export default function BuyTicketPage() {
  const { tripId } = useParams();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
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
    setConfirmDialog({ isOpen: false, type: null });
  };

  // Seat grid layout (5 columns, 8 rows)
  const seats = Array.from({ length: 40 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    const rowLabel = String.fromCharCode(65 + row); // A, B, C, D, E, F, G, H
    return `${rowLabel}${col + 1}`;
  });

  return (
    <div className="w-full h-full overflow-y-auto bg-background/85">
      <BookingContainer tripId={tripId as string} />
    </div>
  );
}
