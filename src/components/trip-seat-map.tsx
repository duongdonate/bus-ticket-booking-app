import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { SeatMap, Seat, SeatStatus } from "@/types/Seat";

export class SeatState implements Seat {
  id: string | undefined;
  position: string;
  status: SeatStatus;
  price: number;
  deckId: string | undefined;
  label: string;

  constructor(seat: Seat, deckId: string, label: string) {
    this.position = seat.position;
    this.status = seat.status;
    this.price = seat.price;
    this.deckId = deckId;
    this.label = label;
    this.id = this.posWithLabel;
  }

  get isAvailable() {
    return this.status === SeatStatus.AVAILABLE;
  }

  get isBooked() {
    return this.status === SeatStatus.BOOKED;
  }

  get isSelected() {
    return this.status === SeatStatus.SELECTED;
  }

  get posWithLabel() {
    return `${this.label}${this.position}`;
  }
  selected() {
    this.status = SeatStatus.SELECTED;
  }
}

export class SeatMapState {
  id: string;
  routeName: string;
  decks: {
    id: string;
    label: string;
    priceFactor: number;
    totalSeats: number;
    remainingCount: string;
    seats: SeatState[];
  }[];

  constructor(seatMap: SeatMap) {
    this.id = seatMap.id;
    this.routeName = seatMap.routeName;
    this.decks = seatMap.decks.map((deck) => ({
      ...deck,
      seats: deck.seats.map((seat) => new SeatState(seat, deck.id, deck.label)),
    }));
  }

  get blockedSeats() {
    const blocked: SeatState[] = [];
    this.decks.forEach((deck) => {
      deck.seats.forEach((seat) => {
        if (seat.isBooked) {
          blocked.push(seat);
        }
      });
    });
    return blocked;
  }
}

interface Props {
  seatMapData: SeatMap;
  selectedSeats?: SeatState[];
  onToggleSeat?: (seat: SeatState) => void;
}

const TripSeatMap = ({ seatMapData, onToggleSeat, selectedSeats }: Props) => {
  const [seatMapState, setSeatMapState] = useState(
    new SeatMapState(seatMapData)
  );

  useEffect(() => {
    setSeatMapState(new SeatMapState(seatMapData));

    const blockedSeats = seatMapState.blockedSeats;

    // Nếu có ghế đã chọn mà bây giờ bị block thì bỏ chọn
    selectedSeats = selectedSeats?.filter((ss) =>
      blockedSeats.some((bs) => bs.id === ss.id)
    );
  }, [seatMapData, selectedSeats]);

  const handleSelectedSeat = (seat: SeatState) => {
    if (onToggleSeat) {
      onToggleSeat(seat);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn ghế</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="flex gap-6 flex-wrap text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-popover border border-secondary rounded"></div>
            <span>Còn trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded"></div>
            <span>Đang chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded cursor-not-allowed"></div>
            <span>Đã bán</span>
          </div>
        </div>

        <Separator />

        {/* Seat Map */}
        <div className="flex justify-center items-center">
          {seatMapState.decks.map((deck) => (
            <div
              key={deck.id}
              className="grid grid-cols-2 gap-3 justify-center max-w-fit mx-auto"
            >
              {deck.seats.map((seat) => (
                <Button
                  key={seat.id}
                  variant={
                    seat.isBooked
                      ? "muted"
                      : selectedSeats?.some((s) => s.id === seat.id)
                        ? "default"
                        : "outline"
                  }
                  className="w-12 h-12 p-0 rounded"
                  disabled={seat.isBooked}
                  onClick={() => handleSelectedSeat(seat)}
                >
                  {seat.id}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripSeatMap;
