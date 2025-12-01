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
  CANCELLED = "CANCELLED",
  PENDING = "PENDIN_PAYMENT",
  FAILED = "FAILED",
}

export enum TicketValidationStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  ALREADY_USED = "ALREADY_USED",
}
