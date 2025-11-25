"use client";
import PageController from "@/components/page-controller";
import { TicketTable } from "@/components/ticket-table";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ticketApi } from "@/services/ticketService";
import { Ticket } from "@/types/Ticket";
import { TicketResult } from "@/components/ticket-results";

const MyTicketsPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["my-tickets", page, size],
    queryFn: () => ticketApi.getAllTickets(page, size),
  });

  useEffect(() => {
    console.log("Fetched My Tickets Data:", data?.data);
    if (data) {
      setTotalPages(data.data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    console.log("Current Page changed to:", page);
  }, [page]);

  return (
    <div className="w-full h-full overflow-y-auto bg-background/85">
      <main className="max-w-6xl mx-auto px-4 py-6">
        <TicketResult
          tickets={data?.data.content as Ticket[] | undefined}
          isLoading={isLoading}
          size={data?.data.totalElements}
        />
        <PageController
          page={page}
          totalPages={totalPages}
          onChangePage={setPage}
        />
      </main>
    </div>
  );
};

export default MyTicketsPage;
