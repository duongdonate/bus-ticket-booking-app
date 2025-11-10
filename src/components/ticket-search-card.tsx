"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";

import { SearchableSelect } from "@/components/searchable-select";
import { DatePicker } from "@/components/date-picker";
import { Selector } from "@/components/selector";

interface TicketSearchCardProps {
  onSearch: (params: any) => void;
  initialParams: any;
}

const optionsLocation = [
  { label: "Việt Nam", value: "vn" },
  { label: "Thái Lan", value: "th" },
  { label: "Lào", value: "la" },
  { label: "Campuchia", value: "kh" },
  { label: "Malaysia", value: "my" },
];

const optionsPassenger = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

export function TicketSearchCard({
  onSearch,
  initialParams,
}: TicketSearchCardProps) {
  const [tripType, setTripType] = useState(initialParams.tripType);
  const [departure, setDeparture] = useState(initialParams.departure);
  const [destination, setDestination] = useState(initialParams.destination);
  const [date, setDate] = useState<Date | undefined>(
    initialParams.date ? new Date(initialParams.date) : undefined
  );
  const [passengers, setPassengers] = useState(initialParams.passengers);
  const [value, setValue] = useState("");

  const recentSearches = [
    "Vũng Tàu - Sài Gòn",
    "Sài Gòn - Vũng Tàu",
    "Hà Nội - Sài Gòn",
  ];

  const handleSearch = () => {
    onSearch({
      tripType,
      departure,
      destination,
      date: date ? format(date, "yyyy-MM-dd") : "",
      passengers,
    });
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
              <div className="space-y-2">
                <Label htmlFor="departure">Điểm đi</Label>
                <Input
                  id="departure"
                  placeholder="Địa điểm đi"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </div>
              {/* Swap Button */}
              <div className="z-10">
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
              <div className="space-y-2">
                <Label htmlFor="destination">Điểm đến</Label>
                <Input
                  id="destination"
                  placeholder="Địa điểm đến"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
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

          <div className="p-10">
            <SearchableSelect
              options={optionsLocation}
              value={value}
              onChange={setValue}
              placeholder="Chọn quốc gia"
            />
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
