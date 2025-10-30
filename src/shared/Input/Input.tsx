"use client";
import type { InputHTMLAttributes } from "react";
import React from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-md font-normal",
      rounded = "rounded-xl",
      type = "text",
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`w-full border-none placeholder:text-muted-foreground focus:ring-1 focus:ring-offset-1 focus:ring-primary bg-input text-card-foreground ${rounded} ${fontClass} ${sizeClass} ${className}`}
        {...args}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
