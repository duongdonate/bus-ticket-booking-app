import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TicketValidationStatus, Ticket } from "@/types/Ticket";
import { ticketApi } from "@/services/ticketService";

export interface ValidateTicketProps {
  ticketId: string;
  method: string;
}

export interface ValidationResult {
  ticketId: string;
  status: TicketValidationStatus;
}

export function useValidationTicket() {
  const queryClient = useQueryClient();
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [validStatus, setValidStatus] = useState<TicketValidationStatus | null>(
    TicketValidationStatus.ALREADY_USED
  );

  const validateTicketMutation = useMutation({
    mutationFn: (data: ValidateTicketProps) =>
      ticketApi.validateTicket(data.ticketId, data.method),
    retry: 0,
    onSuccess: (data) => {
      const result: ValidationResult = data.data;
      setTicketId(result.ticketId);
      setValidStatus(result.status);

      // Invalidate and refetch ticket detail query
      // queryClient.invalidateQueries({
      //   queryKey: ["staff-ticket-detail", result.ticketId],
      // });
    },
    onError: (error) => {
      console.error("Error validating ticket:", error);
      setValidStatus(TicketValidationStatus.INVALID);
    },
  });

  // const { data: ticketDetailRes, isFetching: isFetchingDetail } = useQuery({
  //   queryKey: ["staff-ticket-detail", ticketId],
  //   queryFn: () => ticketApi.getTicketById(ticketId as string),
  //   enabled: !!ticketId,
  // });

  return {
    validateTicket: validateTicketMutation.mutate,
    //isLoading: validateTicketMutation.isPending || isFetchingDetail,
    isSuccess: validateTicketMutation.isSuccess,

    ticketId: ticketId,
    //ticketData: ticketDetailRes?.data,
    validationStatus: validStatus,
    resetValidation: () => {
      setTicketId(null);
      setValidStatus(TicketValidationStatus.ALREADY_USED);
    },
  };
}
