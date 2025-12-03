import { useState, useEffect } from "react";
import { axiosPrivate } from "@/lib/axiosClient";

export const useBusTypesApi = () => {
  const [busTypes, setBusTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all bus types
  const fetchBusTypes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosPrivate.get("/bus-types");
      console.log("✅ Fetched bus types:", response);

      const data = Array.isArray(response.data) ? response.data : [];
      setBusTypes(data);

      return data;
    } catch (err: any) {
      console.error("❌ Fetch bus types failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to fetch bus types"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create new bus type
  const createBusType = async (busTypeData: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("📤 Creating bus type:", busTypeData);
      const response = await axiosPrivate.post("/bus-types", busTypeData);
      console.log("✅ Bus type created:", response.data);

      // Refresh list
      await fetchBusTypes();

      return response.data;
    } catch (err: any) {
      console.error("❌ Create bus type failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to create bus type"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update bus type
  const updateBusType = async (id: any, busTypeData: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("📤 Updating bus type:", id, busTypeData);
      const response = await axiosPrivate.put(`/bus-types/${id}`, busTypeData);
      console.log("✅ Bus type updated:", response.data);

      // Refresh list
      await fetchBusTypes();

      return response.data;
    } catch (err: any) {
      console.error("❌ Update bus type failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to update bus type"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete bus type
  const deleteBusType = async (id: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🗑️ Deleting bus type:", id);
      await axiosPrivate.delete(`/bus-types/${id}`);
      console.log("✅ Bus type deleted");

      // Refresh list
      await fetchBusTypes();

      return true;
    } catch (err: any) {
      console.error("❌ Delete bus type failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to delete bus type"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get bus type by ID
  const getBusTypeById = async (id: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosPrivate.get(`/bus-types/${id}`);
      return response.data;
    } catch (err: any) {
      console.error("❌ Get bus type failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to get bus type"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusTypes();
  }, []);

  return {
    busTypes,
    loading,
    error,
    fetchBusTypes,
    createBusType,
    updateBusType,
    deleteBusType,
    getBusTypeById,
  };
};
