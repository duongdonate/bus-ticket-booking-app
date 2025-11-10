"use client";

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

interface TripScheduleViewProps {
  trip: Trip;
}

export function TripScheduleView({ trip }: TripScheduleViewProps) {
  // Mock stops for the journey
  const stops = [
    { time: trip.departure, location: trip.departureLocation, type: "start" },
    { time: "19:15", location: "Trạm dừng Long Thành", type: "stop" },
    { time: "20:30", location: "Trạm dừng Biên Hòa", type: "stop" },
    { time: trip.arrival, location: trip.arrivalLocation, type: "end" },
  ];

  return (
    <div className="">
      <h4 className="font-semibold mb-2">Chi tiết lịch trình</h4>
      <div className="space-y-0">
        {stops.map((stop, idx) => (
          <div
            key={idx}
            className="h-full min-h-16 flex gap-4 items-baseline relative"
          >
            {/* Timeline */}
            <div className="font-semibold w-12 shrink-0">{stop.time}</div>
            {/* Icon */}
            <div className="h-full flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  stop.type === "start" || stop.type === "end"
                    ? "bg-primary"
                    : "bg-muted-foreground"
                }`}
              ></div>
              {idx < stops.length - 1 && (
                <div className="absolute border-dotted border-r-2 h-full border-muted-foreground top-4"></div>
              )}
            </div>

            {/* Stop Info */}
            <div className="pb-4">
              <div className="text-md font-semibold">{stop.location}</div>
              <p className="text-sm text-muted-foreground">Địa chị cụ thể</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
