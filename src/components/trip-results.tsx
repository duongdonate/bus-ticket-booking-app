"use client";

import { useState, useMemo } from "react";
import { TripFilters } from "@/components/trip-filters";
import { TripList } from "@/components/trip-list";
import { SelectedTripCard } from "./selected-trip-card";
import { TextSearch } from "lucide-react";
import { Trip } from "@/types/Trip";

interface TripResultsProps {
  trips: Trip[];
  searchParams: any;
  viewingScheduleId: string | null;
  onViewSchedule: (id: string | null) => void;
}

export function TripResults({
  trips,
  searchParams,
  viewingScheduleId,
  onViewSchedule,
}: TripResultsProps) {
  const [filters, setFilters] = useState({
    timeSlots: [] as string[],
    busTypes: [] as string[],
    seatRows: [] as string[],
  });

  const filteredTrips = useMemo(() => {
    if (trips.length === 0) return [];

    return trips.filter((trip) => {
      // Filter by time slots
      if (filters.timeSlots.length > 0) {
        const departureHour = new Date(trip.departureTime).getHours();
        const inTimeSlot = filters.timeSlots.some((slot) => {
          switch (slot) {
            case "early":
              return departureHour >= 0 && departureHour < 6;
            case "morning":
              return departureHour >= 6 && departureHour < 12;
            case "afternoon":
              return departureHour >= 12 && departureHour < 18;
            case "evening":
              return departureHour >= 18 && departureHour < 24;
            default:
              return false;
          }
        });
        if (!inTimeSlot) return false;
      }

      // // Filter by bus types
      // if (
      //   filters.busTypes.length > 0 &&
      //   !filters.busTypes.includes(trip.busType)
      // ) {
      //   return false;
      // }

      // // Filter by seat rows
      // if (
      //   filters.seatRows.length > 0 &&
      //   !filters.seatRows.includes(trip.seatRow)
      // ) {
      //   return false;
      // }

      return true;
    });
  }, [trips, filters]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Filters & Selected Trip */}
      <div className="space-y-5">
        {/* {viewingScheduleId && (
          <SelectedTripCard
            tripId={viewingScheduleId}
            searchParams={searchParams}
          />
        )} */}
        <TripFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Right Column: Trip List */}
      <div className="lg:col-span-2">
        <div className="mb-4 text-card-foreground font-semibold flex items-center">
          <TextSearch className="size-8" />
          <span className="ml-2 text-2xl font-bold">Kết quả tìm kiếm</span>
        </div>
        <TripList
          trips={filteredTrips}
          viewingScheduleId={viewingScheduleId}
          onViewSchedule={onViewSchedule}
        />
      </div>
    </div>
  );
}
