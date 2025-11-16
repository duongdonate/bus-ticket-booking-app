"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookingFilters } from "@/components/booking-filters";
import { BookingTable } from "@/components/booking-table";
import { BookingDetailModal } from "@/components/booking-detail";
import { mockBookings, mockBookingDetails } from "./mock-data";
import { isSameDay } from "date-fns";

interface Filters {
  ticketCode: string;
  date: Date | undefined;
  route: string;
  status: string;
}

export default function LichSuMuaVePage() {
  const [filters, setFilters] = useState<Filters>({
    ticketCode: "",
    date: undefined,
    route: "",
    status: "all",
  });

  const [filteredBookings, setFilteredBookings] = useState(mockBookings);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookingDetails[string] | null>(null);

  const handleFilterChange = (field: keyof Filters, value: string | Date | undefined) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filtered = mockBookings;

      if (filters.ticketCode) {
        filtered = filtered.filter((booking) =>
          booking.ticketCode.toLowerCase().includes(filters.ticketCode.toLowerCase())
        );
      }

      if (filters.date) {
        filtered = filtered.filter((booking) => 
          isSameDay(booking.departureDate, filters.date!)
        );
      }

      if (filters.route) {
        filtered = filtered.filter((booking) =>
          booking.route.from.toLowerCase().includes(filters.route.toLowerCase()) ||
          booking.route.to.toLowerCase().includes(filters.route.toLowerCase())
        );
      }

      if (filters.status !== "all") {
        filtered = filtered.filter((booking) => booking.bookingStatus === filters.status);
      }

      setFilteredBookings(filtered);
    } catch (error) {
      console.error("Error searching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      ticketCode: "",
      date: undefined,
      route: "",
      status: "all",
    });
    setFilteredBookings(mockBookings);
  };

  const handleViewDetail = (bookingId: string) => {
    const bookingDetail = mockBookingDetails[bookingId];
    if (bookingDetail) {
      setSelectedBooking(bookingDetail);
      setIsDetailOpen(true);
    } else {
      alert("Không tìm thấy thông tin vé");
    }
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
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Lịch sử mua vé</h1>
          <p className="text-gray-600 text-sm">
            Theo dõi và quản lý quá trình lịch sử mua vé của bạn
          </p>
        </div>
        <Link href="/mua-ve">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 text-sm rounded-full">
            Đặt vé
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <BookingFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
          isLoading={isLoading}
        />

        <BookingTable
          bookings={filteredBookings}
          isLoading={isLoading}
          onViewDetail={handleViewDetail}
        />
      </div>

      <BookingDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        booking={selectedBooking}
        onPrint={handlePrint}
        onDownload={handleDownload}
        onCancel={handleCancelBooking}
      />
    </div>
  );
}