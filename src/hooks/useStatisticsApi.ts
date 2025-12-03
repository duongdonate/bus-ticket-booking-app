import { useState } from "react";
import { axiosPrivate } from "@/lib/axiosClient";

export const useStatisticsApi = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get statistics (works for both ADMIN and OPERATOR)
   * Backend automatically determines role and returns appropriate data
   * GET /api/v1/statistics?startDate=2025-11-01&endDate=2025-11-30
   */
  const fetchStatistics = async (startDate: any, endDate: any) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("startDate", startDate);
      params.append("endDate", endDate);

      const response = await axiosPrivate.get(
        `/statistics?${params.toString()}`
      );
      console.log("✅ Fetched statistics:", response.data);

      setStatistics(response.data);
      return response;
    } catch (err: any) {
      console.error("❌ Fetch statistics failed:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to fetch statistics"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    statistics,
    loading,
    error,
    fetchStatistics,
  };
};
