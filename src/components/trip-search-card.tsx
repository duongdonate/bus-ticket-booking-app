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
  { label: "Sài Gòn", value: "SaGo" },
  { label: "Vũng Tàu", value: "VuTa" },
  { label: "Đà Lạt", value: "DaLa" },
  { label: "Phú Yên", value: "PuYe" },
  { label: "Đà Nẵng", value: "DaNa" },
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

  const [tripType, setTripType] = useState("one-way");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState("1");

  const recentSearches = [
    "Vũng Tàu - Sài Gòn",
    "Sài Gòn - Vũng Tàu",
    "Hà Nội - Sài Gòn",
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Gán các giá trị vào params
    params.set("departurePoint", departure);
    params.set("destination", destination);

    if (date) {
      params.set("departureDate", format(date, "yyyy-MM-dd"));
    }

    if (passengers) {
      params.set("numTickets", passengers);
    }

    // Luôn reset về trang 1 khi tìm kiếm mới
    params.set("page", "1");

    // Params phụ (có thể backend không dùng để lọc nhưng frontend cần để hiển thị lại UI)
    params.set("tripType", tripType);

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
          {/* Trip Type Radio Group */}
          <RadioGroup value={tripType} onValueChange={setTripType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label
                htmlFor="one-way"
                className={`cursor-pointer ${tripType === "one-way" ? "text-primary" : ""}`}
              >
                Một chiều
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label
                htmlFor="round-trip"
                className={`cursor-pointer ${tripType === "round-trip" ? "text-primary" : ""}`}
              >
                Khứ hồi
              </Label>
            </div>
          </RadioGroup>

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
                  placeholder="Chọn quốc gia"
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
                  placeholder="Chọn quốc gia"
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

          {/* Recent Searches */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-3">Tìm kiếm gần đây</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => {
                    const [dept, dest] = search.split(" - ");
                    setDeparture(dept);
                    setDestination(dest);
                  }}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <Button onClick={handleSearch} className="w-full" size="lg">
            Tìm chuyến xe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
