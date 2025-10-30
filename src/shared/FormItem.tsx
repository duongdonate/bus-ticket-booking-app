import type { FC, ReactNode } from "react";
import React from "react";

export interface FormItemProps {
  className?: string | undefined;
  label?: string;
  helperText?: ReactNode | string;
  children?: React.ReactNode;
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  helperText = "",
}) => {
  return (
    <div className={className}>
      {label && <div className="font-medium text-card-foreground">{label}</div>}
      <div className="mt-1.5">{children}</div>
      <div className="mr-2 mt-1 text-right text-xs italic text-destructive">
        {helperText}
      </div>
    </div>
  );
};

export default FormItem;
