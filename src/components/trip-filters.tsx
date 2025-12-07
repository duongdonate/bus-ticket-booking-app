"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Funnel } from "lucide-react";

interface TripFiltersProps {
  filters: {
    timeSlots: string[];
    busTypes: string[];
    seatRows: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export function TripFilters({ filters, onFiltersChange }: TripFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const timeSlots = [
    { id: "early", label: "Sáng sớm (00:00 - 06:00)" },
    { id: "morning", label: "Buổi sáng (06:00 - 12:00)" },
    { id: "afternoon", label: "Buổi chiều (12:00 - 18:00)" },
    { id: "evening", label: "Buổi tối (18:00 - 24:00)" },
  ];

  const busTypes = ["Ghế", "Giường", "Limousine"];
  const seatRows = ["Hàng đầu", "Hàng giữa", "Hàng cuối"];

  const handleTimeSlotChange = (id: string) => {
    const updated = filters.timeSlots.includes(id)
      ? filters.timeSlots.filter((t) => t !== id)
      : [...filters.timeSlots, id];
    onFiltersChange({ ...filters, timeSlots: updated });
  };

  const handleBusTypeChange = (type: string) => {
    const updated = filters.busTypes.includes(type)
      ? filters.busTypes.filter((t) => t !== type)
      : [...filters.busTypes, type];
    onFiltersChange({ ...filters, busTypes: updated });
  };

  const handleSeatRowChange = (row: string) => {
    const updated = filters.seatRows.includes(row)
      ? filters.seatRows.filter((r) => r !== row)
      : [...filters.seatRows, row];
    onFiltersChange({ ...filters, seatRows: updated });
  };

  return (
    <Card className="sticky top-3">
      <CardHeader
        className="cursor-pointer hover:underline"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CardTitle className="text-xl text-card-foreground flex items-center">
          <Funnel className="size-5" />
          <h3 className="ml-3 font-semibold">Bộ lọc tìm kiếm</h3>
        </CardTitle>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-6">
          {/* Time Slots */}
          <div className="space-y-3">
            <h3 className="font-semibold">Giờ đi</h3>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <div key={slot.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={slot.id}
                    checked={filters.timeSlots.includes(slot.id)}
                    onCheckedChange={() => handleTimeSlotChange(slot.id)}
                  />
                  <Label
                    htmlFor={slot.id}
                    className={`cursor-pointer ${filters.timeSlots.includes(slot.id) ? "text-primary" : ""}`}
                  >
                    {slot.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bus Types */}
          <div className="space-y-3">
            <h3 className="font-semibold">Loại xe</h3>
            <div className="flex flex-wrap gap-2">
              {busTypes.map((type) => (
                <Button
                  key={type}
                  variant={
                    filters.busTypes.includes(type) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleBusTypeChange(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Seat Rows */}
          <div className="space-y-3">
            <h3 className="font-semibold">Hàng ghế</h3>
            <div className="flex flex-wrap gap-2">
              {seatRows.map((row) => (
                <Button
                  key={row}
                  variant={
                    filters.seatRows.includes(row) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleSeatRowChange(row)}
                >
                  {row}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
