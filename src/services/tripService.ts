import { axiosPublic } from "@/lib/axiosClient";
import { SeatMap } from "@/types/Seat";
import { PageResponse, Trip, SearchParams } from "@/types/Trip";

export const tripApi = {
  getPublishedTrips: (searchParams: SearchParams) =>
    axiosPublic.get<PageResponse<Trip>>("/published-trips", {
      params: searchParams,
    }),
  getPublishedTripById: (id: string) =>
    axiosPublic.get<Trip>(`/published-trips/${id}`),
  getSeatsByTripId: (tripId: string) =>
    axiosPublic.get<SeatMap>(`/trips/${tripId}/seats`),
};
