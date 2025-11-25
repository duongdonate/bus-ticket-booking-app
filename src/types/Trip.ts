export interface Trip {
  id: string;
  routeName: string; // Ví dụ: "Hanoi - Ninh Binh"
  departureTime: string;
  departurePoint: string;
  arrivalTime: string;
  destination: string;
  basePrice: number;
  totalAvailableSeats?: number | null;
  busTypeId?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number; // API Spring Boot thường trả về cái này
  size: number;
  number: number; // Current page index (0-based)
}

export interface SearchParams {
  departurePoint?: string;
  destination?: string;
  numTickets?: string; // URL params luôn là string
  departureDate?: string;
  page?: string;
  size?: string;
  q?: string;
}
