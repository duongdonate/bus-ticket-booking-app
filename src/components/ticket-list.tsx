"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TripCard } from "./trip-card";

interface TicketListProps {
  filters: any;
  viewingScheduleId: string | null;
  onViewSchedule: (id: string | null) => void;
}

const MOCK_TRIPS = [
  {
    id: "1",
    departure: "18:00",
    arrival: "21:00",
    duration: "3 giờ",
    departureLocation: "VP Bến xe Vũng Tàu",
    arrivalLocation: "Bến xe Miền Tây",
    price: "140.000",
    availableSeats: "28",
    busType: "Ghế",
    seatRow: "Hàng giữa",
  },
  {
    id: "2",
    departure: "06:00",
    arrival: "09:00",
    duration: "3 giờ",
    departureLocation: "VP Bến xe Vũng Tàu",
    arrivalLocation: "Bến xe Miền Tây",
    price: "120.000",
    availableSeats: "15",
    busType: "Giường",
    seatRow: "Hàng đầu",
  },
  {
    id: "3",
    departure: "12:00",
    arrival: "15:30",
    duration: "3.5 giờ",
    departureLocation: "VP Bến xe Vũng Tàu",
    arrivalLocation: "Bến xe Miền Tây",
    price: "180.000",
    availableSeats: "8",
    busType: "Limousine",
    seatRow: "Hàng cuối",
  },
  {
    id: "4",
    departure: "14:30",
    arrival: "17:45",
    duration: "3.25 giờ",
    departureLocation: "VP Bến xe Vũng Tàu",
    arrivalLocation: "Bến xe Miền Tây",
    price: "150.000",
    availableSeats: "22",
    busType: "Ghế",
    seatRow: "Hàng cuối",
  },
];

export function TicketList({
  filters,
  viewingScheduleId,
  onViewSchedule,
}: TicketListProps) {
  const filteredTrips = MOCK_TRIPS.filter((trip) => {
    if (
      filters.busTypes.length > 0 &&
      !filters.busTypes.includes(trip.busType)
    ) {
      return false;
    }
    if (
      filters.seatRows.length > 0 &&
      !filters.seatRows.includes(trip.seatRow)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredTrips.length > 0 ? (
        filteredTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            isActive={viewingScheduleId === trip.id}
            onViewSchedule={onViewSchedule}
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Không có chuyến xe phù hợp với bộ lọc của bạn
        </p>
      )}
    </div>
  );
}
