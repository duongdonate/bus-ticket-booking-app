"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SelectedTripCardProps {
  tripId: string;
  searchParams: any;
}

export function SelectedTripCard({
  tripId,
  searchParams,
}: SelectedTripCardProps) {
  // In a real app, you'd fetch the trip details by ID
  const trips: { [key: string]: any } = {
    "1": {
      departure: "18:00",
      arrival: "21:00",
      departureLocation: "VP Bến xe Vũng Tàu",
      arrivalLocation: "Bến xe Miền Tây",
      date: searchParams.date,
    },
    "2": {
      departure: "06:00",
      arrival: "09:00",
      departureLocation: "VP Bến xe Vũng Tàu",
      arrivalLocation: "Bến xe Miền Tây",
      date: searchParams.date,
    },
    "3": {
      departure: "12:00",
      arrival: "15:30",
      departureLocation: "VP Bến xe Vũng Tàu",
      arrivalLocation: "Bến xe Miền Tây",
      date: searchParams.date,
    },
    "4": {
      departure: "14:30",
      arrival: "17:45",
      departureLocation: "VP Bến xe Vũng Tàu",
      arrivalLocation: "Bến xe Miền Tây",
      date: searchParams.date,
    },
  };

  const trip = trips[tripId];

  if (!trip) return null;

  return (
    <Card className="border-2 border-orange-500 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-sm text-orange-900">
          CHUYẾN CỦA BẠN
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-orange-700 font-semibold">NGÀY ĐI</div>
          <div className="font-semibold">{trip.date}</div>
        </div>
        <div>
          <div className="text-xs text-orange-700 font-semibold">
            TUYẾN ĐƯỜNG
          </div>
          <div className="text-sm">
            {trip.departureLocation} → {trip.arrivalLocation}
          </div>
        </div>
        <div>
          <div className="text-xs text-orange-700 font-semibold">GIỜ ĐI</div>
          <div className="font-semibold">
            {trip.departure} - {trip.arrival}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
