"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { TripScheduleView } from "./trip-schedule-view";
import { useRouter } from "next/navigation";

interface Trip {
  id: string;
  departure: string;
  arrival: string;
  duration: string;
  departureLocation: string;
  arrivalLocation: string;
  price: string;
  availableSeats: string;
  busType: string;
  seatRow: string;
}

interface TripCardProps {
  trip: Trip;
  isActive: boolean;
  onViewSchedule: (id: string | null) => void;
}

export function TripCard({ trip, isActive, onViewSchedule }: TripCardProps) {
  const [activeTab, setActiveTab] = useState("");
  const tabsMap = [
    { value: "schedule", label: "Lịch trình" },
    { value: "transfers", label: "Trung chuyển" },
    { value: "policy", label: "Chính sách" },
  ];
  const router = useRouter();

  const handleSelectTrip = () => {
    const tripParams = new URLSearchParams({
      tripId: trip.id,
      departure: trip.departure,
      arrival: trip.arrival,
      departureLocation: trip.departureLocation,
      arrivalLocation: trip.arrivalLocation,
      price: trip.price,
      busType: trip.busType,
    });
    router.push(`/mua-ve?${tripParams.toString()}`);
  };

  return (
    <Card className="shadow-sm hover:shadow-md hover:border-primary">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Trip Header */}
          <div className="w-full flex items-start">
            {/* Departure & Arrival Info */}
            <div className="flex-1">
              <div className="flex items-center">
                {/* From */}
                <div className="flex flex-col items-center justify-center px-1">
                  <div className="text-2xl font-bold">{trip.departure}</div>
                  <p className="text-sm text-center text-muted-foreground">
                    {trip.departureLocation}
                  </p>
                </div>
                {/* Duration */}
                <div className="w-full flex items-center">
                  <span className="flex-1 border-dotted border-t-2 border-muted-foreground"></span>
                  <div className="flex flex-col items-center justify-center px-4">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {trip.duration}
                    </span>
                  </div>
                  <span className="flex-1 border-dotted border-t-2 border-muted-foreground"></span>
                </div>
                {/* To */}
                <div className="flex flex-col items-center justify-center px-1">
                  <div className="text-2xl font-bold">{trip.arrival}</div>
                  <p className="text-sm text-center text-muted-foreground">
                    {trip.arrivalLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Price & Availability */}
            <div className="w-64 text-right">
              <div className="text-2xl font-bold text-primary">
                {trip.price}đ
              </div>
              <div className="text-sm text-muted-foreground">
                {trip.availableSeats} chỗ trống
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full flex justify-start">
              {tabsMap.map((tab) => (
                <TabsTrigger
                  className="flex-1"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {activeTab && (
              <div className="mt-2 bg-background px-4 py-2 rounded-md overflow-y-auto min-h-32 max-h-64 shadow-sm">
                <TabsContent value="schedule">
                  <TripScheduleView trip={trip} />
                </TabsContent>

                <TabsContent value="transfers" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Không có trung chuyển
                  </p>
                </TabsContent>

                <TabsContent value="policy" className="space-y-4">
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Chính sách hoàn hủy:</strong> Miễn phí trước 24
                      giờ
                    </p>
                    <p>
                      <strong>Thời gian lên xe:</strong> 15 phút trước giờ xuất
                      phát
                    </p>
                  </div>
                </TabsContent>
              </div>
            )}
          </Tabs>

          {/* Select Button */}
          <div className="flex justify-end">
            <Button onClick={handleSelectTrip} variant={"default"}>
              Chọn chuyến
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
