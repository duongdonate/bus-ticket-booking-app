"use client";

import { useState } from "react";
import { TicketSearchCard } from "@/components/ticket-search-card";
import { TicketResults } from "@/components/ticket-results";

export default function DatVePage() {
  const [hasSearched, setHasSearched] = useState(false);
  const [viewingScheduleId, setViewingScheduleId] = useState<string | null>(
    null
  );
  const [searchParams, setSearchParams] = useState({
    departure: "",
    destination: "",
    date: "",
    passengers: 1,
    tripType: "one-way",
  });

  const handleSearch = (params: typeof searchParams) => {
    setSearchParams(params);
    setHasSearched(true);
    setViewingScheduleId(null);
  };

  return (
    <main className="w-full h-full overflow-y-auto bg-background py-8 px-4">
      <TicketSearchCard onSearch={handleSearch} initialParams={searchParams} />

      {hasSearched && (
        <TicketResults
          searchParams={searchParams}
          viewingScheduleId={viewingScheduleId}
          onViewSchedule={setViewingScheduleId}
        />
      )}
    </main>
  );
}
