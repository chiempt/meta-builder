import React from "react";
import { Input } from "antd";
import { FieldMetadata } from "../../../types/metadata";

interface TextFieldProps {
  field: FieldMetadata;
  value?: string;
  onChange?: (value: string) => void;
}

export function TextField({ field, value, onChange }: TextFieldProps) {
  const { displayName, uiConfig, fieldType } = field;

  return (
    <Input
      placeholder={uiConfig?.placeholder || `Nhập ${displayName}`}
      type={fieldType === "EMAIL" ? "email" : "text"}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      allowClear
    />
  );
}
