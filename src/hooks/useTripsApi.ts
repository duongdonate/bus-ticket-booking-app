import { useState, useEffect } from "react";
import { axiosPrivate } from "@/lib/axiosClient";

export const useTripsApi = () => {
  const [trips, setTrips] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all trips with pagination
  const fetchTrips = async (page = 0, size = 10) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosPrivate.get(
        `/trips?page=${page}&size=${size}`
      );
      console.log("✅ Fetched trips:", response.data);

      const responseData = response.data;

      // Handle paginated response
      if (responseData?.content) {
        setTrips(responseData?.content);
        setPagination({
          page: responseData?.number || page,
          size: responseData?.size || size,
          totalPages: responseData?.totalPages || 0,
          totalElements: responseData?.totalElements || 0,
        });
      } else {
        // Fallback for non-paginated response
        const data: any = Array.isArray(response.data) ? response.data : [];
        setTrips(data?.content);
        setPagination({
          page: 0,
          size: data.length,
          totalPages: 1,
          totalElements: data.length,
        });
      }

      return response;
    } catch (err: any) {
      console.error("❌ Fetch trips failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to fetch trips"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get trip by ID with details
  const getTripById = async (id: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosPrivate.get(`/trips/${id}`);
      console.log("✅ Fetched trip details:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("❌ Get trip failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to get trip"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create new trip
  const createTrip = async (tripData: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("📤 Creating trip:", tripData);
      const response = await axiosPrivate.post("/trips", tripData);
      console.log("✅ Trip created:", response.data);

      // Refresh list
      await fetchTrips(pagination.page, pagination.size);

      return response.data;
    } catch (err: any) {
      console.error("❌ Create trip failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to create trip"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update trip
  const updateTrip = async (id: any, tripData: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("📤 Updating trip:", id, tripData);
      const response = await axiosPrivate.put(`/trips/${id}`, tripData);
      console.log("✅ Trip updated:", response.data);

      // Refresh list
      await fetchTrips(pagination.page, pagination.size);

      return response.data;
    } catch (err: any) {
      console.error("❌ Update trip failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to update trip"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete trip
  const deleteTrip = async (id: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🗑️ Deleting trip:", id);
      await axiosPrivate.delete(`/trips/${id}`);
      console.log("✅ Trip deleted");

      // Refresh list
      await fetchTrips(pagination.page, pagination.size);

      return true;
    } catch (err: any) {
      console.error("❌ Delete trip failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to delete trip"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    pagination,
    loading,
    error,
    fetchTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
  };
};
