"use client";

import { useState } from "react";
import { TicketFilters } from "./ticket-filters";
import { TicketList } from "./ticket-list";
import { SelectedTripCard } from "./selected-trip-card";

interface TicketResultsProps {
  searchParams: any;
  viewingScheduleId: string | null;
  onViewSchedule: (id: string | null) => void;
}

export function TicketResults({
  searchParams,
  viewingScheduleId,
  onViewSchedule,
}: TicketResultsProps) {
  const [filters, setFilters] = useState({
    timeSlots: [] as string[],
    busTypes: [] as string[],
    seatRows: [] as string[],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Filters & Selected Trip */}
      <div className="space-y-6">
        {viewingScheduleId && (
          <SelectedTripCard
            tripId={viewingScheduleId}
            searchParams={searchParams}
          />
        )}
        <TicketFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Right Column: Trip List */}
      <div className="lg:col-span-2">
        <TicketList
          filters={filters}
          viewingScheduleId={viewingScheduleId}
          onViewSchedule={onViewSchedule}
        />
      </div>
    </div>
  );
}
