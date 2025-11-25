"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils"; // Dùng hàm cn để merge classes
import { Label } from "@/components/ui/label"; // Label component của Shadcn
import { Eye, EyeOff } from "lucide-react"; // <-- Thêm icon Eye/EyeOff

// Định nghĩa Props
interface FormItemProps {
  label?: string;
  htmlFor?: string; // Bắt buộc phải có để label liên kết với input (Accessibility)
  helperText?: string;
  icon?: React.ReactNode; // Icon component, ví dụ: <Mail className="h-4 w-4" />
  children: React.ReactNode; // Input component thực tế
  error?: boolean; // Trạng thái lỗi
  passwordToggle?: boolean; // Có nút toggle mật khẩu không
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  htmlFor,
  helperText,
  icon,
  children,
  error = false,
  passwordToggle = false,
}) => {
  // State quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword((s) => !s);

  // Lớp CSS cần tiêm vào Input: thêm padding-left (pl-10) nếu có icon
  const injectedClasses = cn(
    icon ? "pl-10" : "", // Padding trái nếu có Icon
    passwordToggle ? "pr-10" : "" // Padding phải nếu có Toggle
  );

  // 2. Xác định giá trị 'type' để tiêm (nếu passwordToggle đang hoạt động)
  const inputTypeToInject = passwordToggle
    ? showPassword
      ? "text"
      : "password"
    : undefined;

  // 4. Chọn Icon Toggle
  const ToggleIcon = showPassword ? EyeOff : Eye;

  // 1. Dùng React.cloneElement để tiêm props vào children
  const inputWithInjectedClass = React.isValidElement(children)
    ? React.cloneElement(children, {
        // Hợp nhất (merge) className hiện tại của children
        // với className mà chúng ta muốn tiêm vào ("pl-10" hoặc "")
        className: cn(
          children.props.className,
          injectedClasses,
          error && "border-destructive"
        ),
        // Tiêm thuộc tính type
        ...(inputTypeToInject && { type: inputTypeToInject }),
        // Thêm thuộc tính cho Accessibility nếu cần (tùy chọn)
        ...(error && { "aria-invalid": true }),
      } as React.HTMLAttributes<HTMLElement>) // Ép kiểu cho TypeScript
    : children; // Nếu không phải element hợp lệ thì render như thường

  return (
    <div className="space-y-2">
      {/* ... (Phần Label giữ nguyên) ... */}
      {label && (
        <Label htmlFor={htmlFor} className={cn(error && "text-destructive")}>
          {label}
        </Label>
      )}

      <div className="relative flex items-center">
        {/* ICON (Vị trí tuyệt đối) */}
        {icon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10",
              error && "text-destructive"
            )}
          >
            {icon}
          </div>
        )}

        {/* INPUT COMPONENT */}
        {inputWithInjectedClass}

        {/* ICON TOGGLE MẬT KHẨU (Vị trí tuyệt đối) */}
        {passwordToggle && (
          <button
            type="button" // Quan trọng: Đặt type="button" để tránh submit form
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 p-1"
            onClick={handleToggle}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <ToggleIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ... (Phần Helper Text giữ nguyên) ... */}
      {helperText && (
        <p
          className={cn(
            "text-xs text-muted-foreground",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
