"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Selector } from "@/components/selector";
import { DatePicker } from "@/components/date-picker";
import { Ticket as TicketIcon, RotateCcw, Search } from "lucide-react";
import { FormItem } from "@/components/ui/form-item";

import { Ticket, TicketStatus } from "@/types/Ticket";
import { useEffect, useState } from "react";

export interface Filters {
  ticketId: string;
  date: Date | undefined;
  routeName: string;
  status: TicketStatus | "all";
}

interface TicketFiltersProps {
  filtersData: Filters;
  onFilterChange: (
    field: keyof Filters,
    value: string | Date | undefined
  ) => void;
  onSearch: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function TicketFilters({
  filtersData,
  onFilterChange,
  onSearch,
  onReset,
  isLoading = false,
}: TicketFiltersProps) {
  const handleReset = () => {
    onReset();
  };
  return (
    <>
      {/* Size & AllElement */}

      {/* Field Fiters Local */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <FormItem
          icon={<TicketIcon className="size-5" />}
          label="Mã vé"
          htmlFor="ticketId"
          key={"ticketId"}
        >
          <Input
            id="ticketId"
            placeholder="Nhập Mã vé"
            value={filtersData.ticketId}
            onChange={(e) => onFilterChange("ticketId", e.target.value)}
            className="h-10 text-sm border-gray-300"
          />
        </FormItem>

        <FormItem label="Tuyến đường" htmlFor="routeName" key={"routeName"}>
          <Input
            id="routeName"
            placeholder="Nhập tuyến đường"
            value={filtersData.routeName}
            onChange={(e) => onFilterChange("routeName", e.target.value)}
            className="h-10 text-sm border-gray-300"
          />
        </FormItem>

        <FormItem label="Thời gian đặt vé" htmlFor="date" key={"date"}>
          <DatePicker
            id="date"
            value={filtersData.date}
            onChange={(date) => onFilterChange("date", date)}
          />
        </FormItem>

        <FormItem label="Trạng thái" htmlFor="status" key={"status"}>
          <Selector
            id="status"
            options={[
              { label: "Tất cả", value: "all" },
              { label: "Đã mua", value: TicketStatus.PURCHASED.toString() },
            ]}
            value={filtersData.status}
            onChange={(value) => onFilterChange("status", value)}
          ></Selector>
        </FormItem>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-sm rounded-lg border-gray-300"
        >
          <RotateCcw className="size-5" />
        </Button>
        <Button
          className="px-8 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          <Search className="size-5" />
          {isLoading ? "Đang tìm..." : "Tìm vé"}
        </Button>
      </div>
    </>
  );
}
