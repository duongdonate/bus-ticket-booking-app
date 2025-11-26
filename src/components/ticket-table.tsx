"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Ticket, TicketStatus } from "@/types/Ticket";
import { SquareDashedTopSolid } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export class TicketState implements Ticket {
  index?: number;
  id: string;
  price: number;
  selectedSeat: string;
  deckLabel: string;
  routeName: string;
  status: TicketStatus;
  arrivalTime?: Date;
  departureTime?: Date;
  arrivalLocation?: string;
  departureLocation?: string;

  constructor(data: Partial<TicketState>) {
    this.id = data.id!;
    this.price = data.price!;
    this.selectedSeat = data.selectedSeat!;
    this.deckLabel = data.deckLabel!;
    this.routeName = data.routeName!;
    this.status = data.status!;
    this.arrivalTime = data.arrivalTime;
    this.departureTime = data.departureTime;
    this.arrivalLocation = data.arrivalLocation;
    this.departureLocation = data.departureLocation;
  }
}

interface TicketTableProps {
  tickets: Ticket[] | undefined;
  isLoading: boolean;
  onViewDetail?: (ticketId: string) => void;
  onCancel?: (ticketId: string) => void;
  size?: number;
  page?: number;
  totalTickets?: number;
}

export type TicketTableColumn = {
  label: string;
  key: keyof Ticket | string;
};

function renderValueTicketFromKey(
  ticket: TicketState,
  key: string | keyof Ticket,
  onViewDetail: (ticketId: string) => void
): React.ReactNode {
  switch (key) {
    case "status": {
      let statusColor = "text-gray-500";
      let statusText = "Unknown";
      let statusBg = "bg-gray-100";

      switch (ticket.status) {
        case "PURCHASED":
          statusBg = "bg-green-100";
          statusColor = "text-green-600";
          statusText = "Đã mua";
          break;
      }

      return (
        <span className={`rounded-md px-2 py-1 font-semibold ${statusBg}`}>
          <span className={`py-2 text-sm whitespace-nowrap ${statusColor}`}>
            {statusText}
          </span>
        </span>
      );
    }
    case "price": {
      return (
        <span className="py-2 font-semibold text-sm whitespace-nowrap text-primary">
          {ticket.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      );
    }
    case "actions": {
      return (
        <div className="flex flex-col gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetail(ticket.id)}
            className="text-xs text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50 h-7 px-4 w-24"
          >
            Chi tiết
          </Button>
        </div>
      );
    }
    default: {
      const value = ticket[key as keyof Ticket];
      return <span className="py-2 text-sm whitespace-nowrap">{value}</span>;
    }
  }
}

export function TicketHeaderTable({ listLabels }: { listLabels?: string[] }) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
      <tr>
        {listLabels &&
          listLabels.map((label) => (
            <th
              key={label}
              className="px-6 py-4 text-center text-sm font-bold text-gray-700 whitespace-nowrap"
            >
              {label}
            </th>
          ))}
      </tr>
    </thead>
  );
}

interface TicketItemRowProps {
  ticket: TicketState;
  listKeys: (keyof Ticket | string)[];
  onViewDetail?: (ticketId: string) => void;
}

export function TicketItemRow({
  ticket,
  listKeys,
  onViewDetail,
}: TicketItemRowProps) {
  return (
    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
      {/* <td className="px-6 py-5 font-semibold text-sm whitespace-nowrap">
        {booking.ticketCode}
      </td> */}
      {listKeys &&
        listKeys.map((key) => (
          <td key={String(key)} className="px-6 py-5 text-sm whitespace-nowrap">
            {renderValueTicketFromKey(ticket, key, onViewDetail!)}
          </td>
        ))}
      {/* <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex flex-col gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetail(booking.id)}
            className="text-xs text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50 h-7 px-4 w-24"
          >
            Chi tiết
          </Button>
          {booking.bookingStatus === "confirmed" && onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking.id)}
              className="text-xs text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 h-7 px-4 w-24"
            >
              Hủy
            </Button>
          )}
        </div>
      </td> */}
    </tr>
  );
}

export function TicketBodyTable({
  isLoading,
  tickets,
  listKeys,
  onViewDetail,
  size = 10,
}: {
  isLoading?: boolean;
  tickets: TicketState[];
  listKeys: (keyof Ticket | string)[];
  onViewDetail: (ticketId: string) => void;
  size?: number;
}) {
  return (
    <tbody className="bg-white">
      {isLoading ? (
        Array.from({ length: size }).map((_, index) => (
          <tr
            key={index}
            className="border-b border-gray-100 hover:bg-gray-50 animate-pulse px-6 py-5 h-10 duration-1000 delay-200"
          ></tr>
        ))
      ) : tickets.length === 0 ? (
        <tr>
          <td colSpan={listKeys.length} className="py-20">
            <div className="flex flex-col items-center justify-center text-gray-400">
              <div className="w-20 h-20 mb-3">
                <SquareDashedTopSolid className="size-20" />
              </div>
              <p className="text-base font-medium">No Data</p>
              <p className="text-sm mt-1">Không có dữ liệu lịch sử mua vé</p>
            </div>
          </td>
        </tr>
      ) : (
        tickets.map((ticket) => (
          <TicketItemRow
            key={ticket.id}
            ticket={ticket}
            listKeys={listKeys}
            onViewDetail={onViewDetail}
          />
        ))
      )}
    </tbody>
  );
}

export function TicketTable({
  tickets,
  isLoading,
  onViewDetail,
  onCancel,
  size,
  page,
  totalTickets,
}: TicketTableProps) {
  const ticketColumns: TicketTableColumn[] = [
    { label: "Hành Động", key: "actions" },
    { label: "Mã Vé", key: "id" },
    { label: "Trạng Thái", key: "status" },
    { label: "Số ghế", key: "selectedSeat" },
    { label: "Dãy", key: "deckLabel" },
    { label: "Giá", key: "price" },
    { label: "Tuyến Đường", key: "routeName" },
  ];

  const [ticketsState, setTicketsState] = useState<TicketState[]>([]);

  const showIndexTable = useMemo(() => {
    const fromIndex = page && size ? (page - 1) * size + 1 : 0;
    const toIndex =
      page && size
        ? Math.min(
            (page - 1) * size + (tickets ? tickets.length : 0),
            totalTickets || 0
          )
        : 0;
    return `${fromIndex} - ${toIndex}`;
  }, [page, size, tickets, totalTickets]);

  useEffect(() => {
    if (tickets) {
      setTicketsState(tickets.map((ticket) => new TicketState(ticket)));
    }
  }, [tickets]);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-lg text-card-foreground mb-2 block font-semibold">
          Hiển thị {showIndexTable} trên {totalTickets} vé
        </span>
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="max-h-[50vh] overflow-x-auto overflow-y-auto">
          <table className="w-full">
            <TicketHeaderTable
              listLabels={ticketColumns.map((item) => item.label)}
            />
            <TicketBodyTable
              size={size}
              isLoading={isLoading}
              tickets={ticketsState}
              listKeys={ticketColumns.map((item) => item.key)}
              onViewDetail={onViewDetail!}
            />
          </table>
        </div>
      </div>
    </>
  );
}
