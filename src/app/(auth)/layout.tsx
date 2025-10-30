"use client";

import Image from "next/image";
import React, { Suspense } from "react";

import Background from "../../assets/background.png";
import Bus from "../../assets/school-bus.png";
import Loading from "../loading";

export default function AuthLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center">
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <div className="-z-10">
        <div className="absolute bottom-0 right-0 w-full overflow-hidden">
          <div className="animation-marquee w-max">
            <Image
              src={Bus}
              alt="bus"
              className="size-32 object-contain object-center"
            />
          </div>
        </div>
        <Image
          src={Background}
          alt="background"
          fill
          className="-z-10 overflow-hidden object-cover object-center"
        />
      </div>
    </div>
  );
}

// Enable edge runtime, but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
