"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TripCard } from "@/components/trip-card";
import { Trip } from "@/types/Trip";

interface TripListProps {
  trips: Trip[];
  viewingScheduleId: string | null;
  onViewSchedule: (id: string | null) => void;
}

export function TripList({
  trips,
  viewingScheduleId,
  onViewSchedule,
}: TripListProps) {
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);

  // const filteredTrips = MOCK_TRIPS.filter((trip) => {
  //   if (
  //     filters.busTypes.length > 0 &&
  //     !filters.busTypes.includes(trip.busType)
  //   ) {
  //     return false;
  //   }
  //   if (
  //     filters.seatRows.length > 0 &&
  //     !filters.seatRows.includes(trip.seatRow)
  //   ) {
  //     return false;
  //   }
  //   return true;
  // });

  return (
    <div className="space-y-4">
      {filteredTrips.length > 0 ? (
        filteredTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            isActive={true}
            onViewSchedule={onViewSchedule}
          />
        ))
      ) : (
        <p className="text-center text-xl text-muted-foreground py-8">
          Không có chuyến xe phù hợp
        </p>
      )}
    </div>
  );
}
