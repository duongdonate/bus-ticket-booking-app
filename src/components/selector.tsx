"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

type Option = {
  label?: string;
  value: any;
};

interface SelectorProps {
  id?: string;
  value: string;
  onChange?: (value: string) => void;
  options: Option[];
  unit?: string;
}

export const Selector = ({
  id,
  value,
  onChange,
  options,
  unit = "",
}: SelectorProps) => {
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const handleSelect = (val: any) => {
    setSelectedValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  useEffect(() => {
    if (value === undefined || value === null) {
      setSelectedValue("");
    } else {
      setSelectedValue(value);
    }
  }, [value, selectedValue]);

  return (
    <Select value={selectedValue} onValueChange={handleSelect}>
      <SelectTrigger id={id}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((otp, index) => (
          <SelectItem key={index} value={String(otp.value)}>
            {otp?.label || otp.value + unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
