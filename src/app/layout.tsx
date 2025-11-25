import type { Metadata } from "next";
import "@/styles/globals.css";
import { Suspense } from "react";
import AppProvider from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "Bus Ticket Booking Webapp",
  description:
    "A web application for booking bus tickets easily and conveniently.",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className="w-screen h-screen">
        <AppProvider>
          <Suspense>{children}</Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
