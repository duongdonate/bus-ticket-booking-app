"use client";
import { TripSearchCard } from "@/components/trip-search-card";
import FindingTripContainer from "@/components/finding-trip-container";
import { SearchParams } from "@/types/Trip";

export default function BookingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <TripSearchCard />
      <FindingTripContainer searchParams={searchParams} />
    </main>
  );
}
