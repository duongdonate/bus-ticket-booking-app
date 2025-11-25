"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { vi } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface DatePickerProps {
  id?: string;
  value: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}

export const DatePicker = ({ id, value, onChange }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value || undefined);
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (value === undefined || value === null) {
      setDate(undefined);
    } else {
      setDate(value);
    }
  }, [value, date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          className="w-full justify-start bg-transparent"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
};
