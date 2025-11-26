import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface TicketData {
  code: string;
  class: string;
  purchaserName: string;
  email: string;
  phone: string;
  purchaseTime: string;
  checkInTime?: string;
  checkInStaff?: string;
}

interface TicketDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketData: TicketData;
  isInvalid: boolean;
}

export default function TicketDetailsModal({
  open,
  onOpenChange,
  ticketData,
  isInvalid,
}: TicketDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-sm rounded-2xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-base font-semibold">
            Chi tiết thông tin vé
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Mã vé</p>
              <p className="text-sm font-semibold text-foreground">
                {ticketData.code}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Người mua</p>
              <p className="text-sm font-semibold text-foreground">
                {ticketData.purchaserName}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-semibold text-foreground">
                {ticketData.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Số điện thoại</p>
              <p className="text-sm font-semibold text-foreground">
                {ticketData.phone}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Thời gian mua</p>
              <p className="text-sm font-semibold text-foreground">
                {ticketData.purchaseTime}
              </p>
            </div>

            {isInvalid && ticketData.checkInTime && (
              <div className="bg-rose-50 dark:bg-rose-950/30 rounded-lg p-3 space-y-2 border border-rose-200 dark:border-rose-800">
                <p className="text-xs text-muted-foreground">
                  Thời gian check-in
                </p>
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  {ticketData.checkInTime}
                </p>
                {ticketData.checkInStaff && (
                  <>
                    <p className="text-xs text-muted-foreground">
                      NV: Đông Nguyễn
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
