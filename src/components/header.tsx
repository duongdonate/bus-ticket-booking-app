import Image from "next/image";
import { useState } from "react";
import { UserRoundCog } from "lucide-react";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export function Header() {
  const [avatarPreview, setAvatarPreview] = useState(
    "https://avatar.iran.liara.run/public/boy"
  );

  return (
    <header className="w-full px-4 py-2 bg-popover sticky top-0 z-50 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <Image src={Logo} alt="Logo" width={120} height={40} />
      <div className="text-center text-xl font-bold text-primary">
        ĐẶT VÉ XE TRỰC TUYẾN
      </div>

      {/* Profile */}
      <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden cursor-pointer group relative">
        <Image
          src={avatarPreview}
          alt="Profile"
          width={128}
          height={128}
          className="object-cover object-center w-full h-full"
        />
        {/* Overlay button on hover */}
        <Link
          href="/profile"
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <UserRoundCog className="text-white size-6" />
        </Link>
      </div>
    </header>
  );
}
