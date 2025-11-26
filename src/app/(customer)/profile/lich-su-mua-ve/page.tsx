"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TicketFilters, Filters } from "@/components/ticket-filters";
import { TicketDetailModal } from "@/components/ticket-detail";
import { mockBookings, mockBookingDetails } from "./mock-data";
import { isSameDay } from "date-fns";
import PageController from "@/components/page-controller";
import { TicketTable } from "@/components/ticket-table";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ticketApi } from "@/services/ticketService";
import { Ticket } from "@/types/Ticket";
import { TicketResult } from "@/components/ticket-results";
import { usePathname } from "next/navigation";

const LIMIT_SIZE = 10;
export default function LichSuMuaVePage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size, setSize] = useState(LIMIT_SIZE);
  const pathname = usePathname();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["my-tickets", page, size],
    queryFn: () => ticketApi.getAllTickets(page, size),
    enabled: pathname === "/profile/lich-su-mua-ve",
  });

  useEffect(() => {
    console.log("Fetched My Tickets Data:", data?.data);
    if (data) {
      setTotalPages(data.data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    console.log("Current Page changed to:", page);
  }, [page]);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");

  // const handleSearch = async () => {
  //   setIsLoading(true);

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     let filtered = mockBookings;

  //     if (filters.ticketCode) {
  //       filtered = filtered.filter((booking) =>
  //         booking.ticketCode
  //           .toLowerCase()
  //           .includes(filters.ticketCode.toLowerCase())
  //       );
  //     }

  //     if (filters.date) {
  //       filtered = filtered.filter((booking) =>
  //         isSameDay(booking.departureDate, filters.date!)
  //       );
  //     }

  //     if (filters.route) {
  //       filtered = filtered.filter(
  //         (booking) =>
  //           booking.route.from
  //             .toLowerCase()
  //             .includes(filters.route.toLowerCase()) ||
  //           booking.route.to.toLowerCase().includes(filters.route.toLowerCase())
  //       );
  //     }

  //     if (filters.status !== "all") {
  //       filtered = filtered.filter(
  //         (booking) => booking.bookingStatus === filters.status
  //       );
  //     }

  //     setFilteredBookings(filtered);
  //   } catch (error) {
  //     console.error("Error searching bookings:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleViewDetail = (ticketId: string) => {
    setIsDetailOpen(true);
    setSelectedTicketId(ticketId);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Tính năng tải về đang được phát triển");
  };

  const handleCancelBooking = () => {
    if (confirm("Bạn có chắc chắn muốn hủy vé này?")) {
      alert("Đã hủy vé thành công");
      setIsDetailOpen(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Lịch sử mua vé</h1>
          <p className="text-gray-600 text-sm">
            Theo dõi và quản lý quá trình lịch sử mua vé của bạn
          </p>
        </div>
        <Link href="/trips">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 text-sm rounded-full">
            Đặt vé
          </Button>
        </Link>
      </div>

      <TicketResult
        tickets={data?.data.content as Ticket[] | undefined}
        isLoading={isLoading}
        totalTickets={data?.data.totalElements}
        page={page}
        size={size}
        onViewDetail={handleViewDetail}
      />
      <PageController
        page={page}
        totalPages={totalPages}
        onChangePage={setPage}
      />

      <TicketDetailModal
        isOpen={isDetailOpen}
        ticketId={selectedTicketId}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}
