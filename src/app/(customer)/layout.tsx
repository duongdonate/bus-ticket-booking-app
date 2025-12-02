"use client";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";
import ChatWidget from "@/components/chat-widget";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isBookingPage =
    pathname.startsWith("/trips") && pathname.split("/").length >= 3;

  const isProfileLayout = pathname.startsWith("/profile");
  const isPaymentResultPage = pathname === "/payment-result";

  if (isProfileLayout) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full bg-background overflow-y-auto">
      {!isBookingPage && !isPaymentResultPage && <Header />}
      <ChatWidget />
      {children}
    </div>
  );
}

export default CustomerLayout;
