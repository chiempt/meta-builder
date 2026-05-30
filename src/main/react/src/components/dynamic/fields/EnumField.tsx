import React from "react";
import { Select } from "antd";
import { FieldMetadata } from "../../../types/metadata";

interface EnumFieldProps {
  field: FieldMetadata;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export function EnumField({ field, value, onChange }: EnumFieldProps) {
  const { uiConfig, enumConfig } = field;
  const options = enumConfig?.options || [];

  return (
    <Select
      placeholder={uiConfig?.placeholder || `Select ${field.displayName}`}
      value={value}
      onChange={onChange}
      options={options.map((opt) => ({
        label: opt.label,
        value: opt.value,
      }))}
      allowClear
    />
  );
}
