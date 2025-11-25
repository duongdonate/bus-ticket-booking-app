export interface Ticket {
  id: string;
  status: TicketStatus;
  price: number;
  selectedSeat: string;
  deckLabel: string;
  routeName: string;
}

export enum TicketStatus {
  PURCHASED = "PURCHASED",
}
