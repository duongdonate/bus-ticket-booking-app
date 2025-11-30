"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { TripScheduleView } from "@/components/trip-schedule-view";
import { useRouter } from "next/navigation";
import { Trip } from "@/types/Trip";

interface TripCardProps {
  trip: Trip;
  isActive: boolean;
  onViewSchedule: (id: string | null) => void;
}

export class TripState {
  id: string;
  routeName: string;
  departureTime: Date;
  arrivalTime: Date;
  departureLocation: string;
  arrivalLocation: string;
  duration: number; // in minutes
  totalAvailableSeats: number;
  price: number;

  constructor({
    id,
    routeName, // Ví dụ: "Hanoi - Ninh Binh"
    departureTime,
    departurePoint,
    arrivalTime,
    destination,
    totalAvailableSeats,
    basePrice,
  }: Trip) {
    this.id = id;
    this.routeName = routeName;
    this.departureTime = new Date(departureTime);
    this.arrivalTime = new Date(arrivalTime);
    this.arrivalLocation = destination;
    this.departureLocation = routeName.split(" - ")[0];
    this.duration = Math.floor(
      (this.arrivalTime.getTime() - this.departureTime.getTime()) / 60000
    ); // convert ms to minutes
    this.totalAvailableSeats = totalAvailableSeats || 0;
    this.price = basePrice || 0; // Placeholder, replace with actual price if available
  }
  get durationString() {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours} giờ ${minutes} phút`;
  }

  get departureTimeString() {
    return this.departureTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  get arrivalTimeString() {
    return this.arrivalTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  get priceString() {
    return (this.price || 0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
}

export function TripCard({ trip, isActive, onViewSchedule }: TripCardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const tabsMap = [
    { value: "schedule", label: "Lịch trình" },
    { value: "transfers", label: "Trung chuyển" },
    { value: "policy", label: "Chính sách" },
  ];

  const [tripState, setTripState] = useState<TripState>(new TripState(trip));

  // const router = useRouter();
  const handleSelectTrip = () => {
    console.log("Selected trip:", tripState);
    router.push(`/trips/${trip.id}`);
  };

  return (
    <Card className="shadow-sm hover:shadow-md hover:border-primary">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Trip Header */}
          <div className="w-full flex items-start">
            {/* Departure & Arrival Info */}
            <div className="flex-1">
              <div className="flex items-baseline">
                {/* From */}
                <div className="flex flex-col items-center justify-center px-1">
                  <div className="text-2xl font-bold">
                    {tripState.departureTimeString}
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    {tripState.departureLocation}
                  </p>
                </div>
                {/* Duration */}
                <div className="w-full items-center lg:flex hidden">
                  {" "}
                  {/* Add hidden md:flex class */}
                  <span className="flex-1 border-dotted border-t-2 border-muted-foreground"></span>
                  <div className="flex flex-col items-center justify-center px-4">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {tripState.durationString}
                    </span>
                  </div>
                  <span className="flex-1 border-dotted border-t-2 border-muted-foreground"></span>
                </div>
                {/* To */}
                <div className="flex flex-col items-center justify-center px-1">
                  <div className="text-2xl font-bold">
                    {tripState.arrivalTimeString}
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    {tripState.arrivalLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Price & Availability */}
            <div className="w-44 text-right">
              <p className="text-card-foreground font-semibold">Giá từ</p>
              <div className="text-lg font-bold text-primary">
                {tripState.priceString}
              </div>
              {/* <div className="text-sm text-muted-foreground">
                {tripState.totalAvailableSeats} chỗ trống
              </div> */}
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
                  {/* <TripScheduleView trip={trip} /> */}
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
              Xem Chi Tiết
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
