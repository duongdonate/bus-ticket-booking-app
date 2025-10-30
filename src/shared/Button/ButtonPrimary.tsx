import React from "react";

import type { ButtonProps } from "@/shared/Button/Button";
import Button from "@/shared/Button/Button";

export interface ButtonPrimaryProps extends ButtonProps {
  href?: any;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-transform duration-75 disabled:bg-opacity-70 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
