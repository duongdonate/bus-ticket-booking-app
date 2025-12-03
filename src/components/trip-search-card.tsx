"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";

import { SearchableSelect } from "@/components/searchable-select";
import { DatePicker } from "@/components/date-picker";
import { Selector } from "@/components/selector";
import { useRouter, useSearchParams } from "next/navigation";

const optionsLocation = [
  { label: "Sài Gòn", value: "Sài Gòn" },
  { label: "Vũng Tàu", value: "Vũng Tàu" },
  { label: "Đà Lạt", value: "Đà Lạt" },
  { label: "Phú Yên", value: "Phú Yên" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
];

const optionsPassenger = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

export function TripSearchCard() {
  const router = useRouter();

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState("1");

  const isSearchEnabled = departure && destination;

  const handleSearch = () => {
    const params = new URLSearchParams();

    const routeName =
      departure && destination ? departure + " - " + destination : "";
    // Gán các giá trị vào params
    params.set("routeName", departure + " - " + destination);

    if (date) {
      params.set("departureDate", format(date, "yyyy-MM-dd"));
    }

    if (passengers) {
      params.set("numTickets", passengers);
    }

    // 4. Đẩy lên URL -> Next.js sẽ bắt sự kiện này ở page.tsx -> Trigger fetch data
    // scroll: false để giữ vị trí màn hình, không bị nhảy lên đầu trang
    router.push(`/trips?${params.toString()}`);
  };

  const handleSwap = () => {
    setDeparture(destination);
    setDestination(departure);
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            {/* Departure & Destination */}
            <div className="col-span-2 flex justify-center items-end gap-1">
              {/* Departure */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="departure">Điểm đi</Label>
                <SearchableSelect
                  id="departure"
                  options={optionsLocation}
                  value={departure}
                  onChange={setDeparture}
                  placeholder="Chọn địa điểm"
                />
              </div>
              {/* Swap Button */}
              <div className="shrink-0 z-10">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  className="rounded-full bg-transparent"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
              {/* Destination */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="destination">Điểm đến</Label>
                <SearchableSelect
                  id="destination"
                  options={optionsLocation}
                  value={destination}
                  onChange={setDestination}
                  placeholder="Chọn địa điểm"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Ngày đi</Label>
              <DatePicker id="date" value={date} onChange={setDate} />
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <Label htmlFor="passengers">Số vé</Label>
              <Selector
                id="passengers"
                value={String(passengers)}
                onChange={setPassengers}
                options={optionsPassenger}
                unit=" vé"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            disabled={!isSearchEnabled}
            onClick={handleSearch}
            className="w-full"
            size="lg"
          >
            Tìm chuyến xe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
