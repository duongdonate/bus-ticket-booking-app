"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { tripApi } from "@/services/tripService";
import { SearchParams } from "@/types/Trip";
import { TripResults } from "@/components/trip-results";
import PageController from "@/components/page-controller";

interface Props {
  searchParams: SearchParams;
  page?: number;
  size?: number;
}

export default function FindingTripContainer({
  searchParams,
  page,
  size = 10,
}: Props) {
  console.log("FindingTripContainer Rendered with searchParams:", searchParams);

  // 1. React Query: Lắng nghe searchParams thay đổi -> Gọi axiosPublic
  const { data, isLoading, isError } = useQuery({
    queryKey: ["published-trips", searchParams],
    queryFn: () => tripApi.getPublishedTrips(searchParams),
    //enabled: Object.keys(searchParams).length > 0, // Chỉ chạy khi searchParams không rỗng
  });

  useEffect(() => {
    console.log("Fetched Data:", data?.data);
  }, [data]);

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (isError) return <div>Lỗi kết nối!</div>;
  if (!data) return null;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <TripResults
        trips={data.data.content}
        searchParams={searchParams}
        viewingScheduleId={null}
        onViewSchedule={() => {}}
      />
      {/* PageControll */}
      <PageController
        page={data.data.number}
        totalPages={data.data.totalPages}
      />
    </div>
  );
}
