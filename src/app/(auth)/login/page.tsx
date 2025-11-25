"use client";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form-item";
import { UserRound, RectangleEllipsis } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/useAuthStore";
import { User } from "@/types/User";
import { Role } from "@/types/Role";
import Logo from "@/assets/logo.svg";
import Image from "next/image";

const PageLogin = () => {
  const { login, isLoggingIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Thực tế
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  //Sử dụng ở môi trường development để làm giả việc đăng nhập
  // const authStore = useAuthStore();
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const mockUser: User = {
  //     username: "testUser",
  //     email: "test@example.com",
  //     firstname: "test-firstname",
  //     lastname: "test-lastname",
  //     roles: [Role.PASSENGER],
  //   }; // Sample user
  //   authStore.setAuth(mockUser, "mockAccessToken", "mockRefreshToken");
  // };

  return (
    <div className="mt-16 h-max rounded-2xl bg-card p-10 shadow-2xl w-full max-w-md">
      <Image
        src={Logo}
        alt="Logo"
        width={180}
        height={60}
        className="mx-auto mb-10"
      />
      <div className="mx-auto">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid gap-2">
            <FormItem icon={<UserRound className="size-5" />}>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="rounded-xl h-10 px-4 py-2"
              />
            </FormItem>
            <FormItem
              icon={<RectangleEllipsis className="size-5" />}
              passwordToggle
            >
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password"
                className="rounded-xl h-10 px-4 py-2"
              />
            </FormItem>
            <Button type="submit" className="mt-2 rounded-xl h-10 px-4 py-2">
              {isLoggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
          <span className="block text-center text-md font-semibold text-muted-foreground">
            Tạo tài khoản mới? {` `}
            <Link
              href="/signup"
              className="text-primary hover:underline hover:underline-offset-2"
            >
              Đăng Ký
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
