"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/date-picker";
import { Ticket } from "lucide-react";

interface Filters {
  ticketCode: string;
  date: Date | undefined;
  route: string;
  status: string;
}

interface BookingFiltersProps {
  filters: Filters;
  onFilterChange: (field: keyof Filters, value: string | Date | undefined) => void;
  onSearch: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function BookingFilters({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  isLoading = false,
}: BookingFiltersProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block text-gray-700">Mã vé</label>
          <div className="relative">
            <Input
              placeholder="Nhập Mã vé"
              value={filters.ticketCode}
              onChange={(e) => onFilterChange("ticketCode", e.target.value)}
              className="pl-10 h-10 text-sm border-gray-300"
            />
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block text-gray-700">Thời gian</label>
          <DatePicker
            value={filters.date}
            onChange={(date) => onFilterChange("date", date)}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block text-gray-700">Tuyến đường</label>
          <Input
            placeholder="Nhập tuyến đường"
            value={filters.route}
            onChange={(e) => onFilterChange("route", e.target.value)}
            className="h-10 text-sm border-gray-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block text-gray-700">Trạng thái</label>
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange("status", value)}
          >
            <SelectTrigger className="h-10 text-sm border-gray-300">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="confirmed">Đã xác nhận</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mb-6">
        <Button
          onClick={onReset}
          variant="outline"
          className="px-6 py-2 text-sm rounded-lg border-gray-300"
        >
          Đặt lại
        </Button>
        <Button
          onClick={onSearch}
          className="px-8 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Đang tìm..." : "Tìm"}
        </Button>
      </div>
    </>
  );
}