export interface Deck {
  id: string;
  label: string;
  priceFactor: number;
  totalSeats: number;
  remainingCount: string;
  seats: Seat[];
}

export interface SeatMap {
  id: string;
  routeName: string;
  decks: Deck[];
}

export interface Seat {
  position: string;
  status: SeatStatus;
  price: number;
  deckId?: string;
}

export enum SeatStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  SELECTED = "SELECTED",
}
