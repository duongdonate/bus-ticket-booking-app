"use client";

import { useState, useMemo, useEffect } from "react";
import { TicketFilters } from "./ticket-filters";
import { TicketTable } from "./ticket-table";
import { Filters } from "./ticket-filters";

interface TicketResultProps {
  isLoading: boolean;
  tickets?: any[];
  size?: number;
  page?: number;
  totalTickets?: number;
  onViewDetail?: (ticketId: string) => void;
}

export function TicketResult({
  isLoading,
  tickets,
  size,
  onViewDetail,
  totalTickets,
  page,
}: TicketResultProps) {
  const [filters, setFilters] = useState<Filters>({
    ticketId: "",
    date: undefined,
    routeName: "",
    status: "all",
  });

  const handleFilterChange = (
    field: keyof Filters,
    value: string | Date | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      ticketId: "",
      date: undefined,
      routeName: "",
      status: "all",
    });
  };

  const filteredTickets = useMemo(() => {
    if (!tickets || tickets.length === 0) return [];

    return tickets.filter((ticket) => {
      // Filter by ticket ID
      if (
        filters.ticketId &&
        !ticket.id.toLowerCase().includes(filters.ticketId.toLowerCase())
      ) {
        return false;
      }

      // Filter by route name
      if (
        filters.routeName &&
        !ticket.routeName
          .toLowerCase()
          .includes(filters.routeName.toLowerCase())
      ) {
        return false;
      }

      // Filter by date
      if (filters.date) {
        const ticketDate = new Date(ticket.departureTime);
        if (
          ticketDate.getFullYear() !== filters.date.getFullYear() ||
          ticketDate.getMonth() !== filters.date.getMonth() ||
          ticketDate.getDate() !== filters.date.getDate()
        ) {
          return false;
        }
      }

      // Filter by status
      if (filters.status !== "all" && ticket.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [tickets, filters]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <TicketFilters
        filtersData={filters}
        onFilterChange={handleFilterChange}
        onSearch={() => {}}
        onReset={handleReset}
        isLoading={isLoading}
      />

      <TicketTable
        tickets={filteredTickets}
        totalTickets={totalTickets}
        isLoading={isLoading}
        size={size}
        page={page}
        onViewDetail={onViewDetail}
      />
    </div>
  );
}
