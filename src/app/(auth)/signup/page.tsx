"use client";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form-item";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ContactRound, SquareAsterisk, UserRound } from "lucide-react";

// Định nghĩa các biến thể animation (Variants)
const slideVariants: Variants = {
  initial: {
    x: 50,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween", // Dùng tween cho chuyển động mượt
      duration: 0.3,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

const PageSignUp = () => {
  const [activeTab, setActiveTab] = useState("step-1");
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Dữ liệu gửi API:", formData);
  };

  const handleNext = (nextStep: string) => {
    // Logic validate ở đây nếu cần...
    setActiveTab(nextStep);
  };

  const handleBack = (prevStep: string) => {
    setActiveTab(prevStep);
  };

  // Hàm chuyển đổi tên tab thành số (để dễ dàng quản lý)
  const stepNumber = parseInt(activeTab.split("-")[1]);
  return (
    <div className="mt-8 h-max rounded-2xl bg-card py-10 px-8 shadow-2xl w-full max-w-lg">
      <h2 className="mb-10 text-center text-2xl font-semibold text-card-foreground">
        Tạo Tài Khoản Mới
      </h2>
      <div className="mx-auto max-w-md">
        <div className="space-y-4">
          {/* Thanh tiêu đề Tabs (Progress Bar) */}
          <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-fit">
              {/* Vẫn dùng TabsTrigger để làm chỉ báo trực quan */}
              <TabsTrigger value="step-1" disabled={activeTab !== "step-1"}>
                <div className="flex flex-col justify-center items-center text-xs">
                  <UserRound className="size-5" />
                  Tên đăng nhập
                </div>
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled={activeTab !== "step-2"}>
                <div className="flex flex-col justify-center items-center text-xs">
                  <ContactRound className="size-5" />
                  Thông tin cá nhân
                </div>
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled={activeTab !== "step-3"}>
                <div className="flex flex-col justify-center items-center text-xs">
                  <SquareAsterisk className="size-5" />
                  Mật khẩu
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* --- KHU VỰC ANIMATION VÀ RENDER NỘI DUNG --- */}
          {/* AnimatePresence cho phép chạy animation exit khi component bị gỡ bỏ */}
          <AnimatePresence mode="wait">
            {/* Step 1: EMAIL */}
            {activeTab === "step-1" && (
              <motion.div
                key="step1" // Key duy nhất là bắt buộc
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4" // Đảm bảo giữ layout
              >
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />

                <Button className="w-full" onClick={() => handleNext("step-2")}>
                  Next Step
                </Button>
              </motion.div>
            )}

            {/* Step 2: PERSONAL INFO */}
            {activeTab === "step-2" && (
              <motion.div
                key="step2" // Key duy nhất
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <Input
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleBack("step-1")}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleNext("step-3")}
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: USERNAME & PASS */}
            {activeTab === "step-3" && (
              <motion.div
                key="step3" // Key duy nhất
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <FormItem passwordToggle={true}>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormItem>
                <FormItem passwordToggle={true}>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </FormItem>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleBack("step-2")}
                  >
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleSubmit}>
                    Create Account
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <span className="block w-full text-center text-md font-semibold text-muted-foreground">
            Bạn đã có tài khoản? {` `}
            <Link
              href="/login"
              className="text-primary hover:underline hover:underline-offset-2"
            >
              Đăng Nhập
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
