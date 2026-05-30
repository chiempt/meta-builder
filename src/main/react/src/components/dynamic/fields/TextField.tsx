import React from "react";
import { Input } from "antd";
import { FieldMetadata } from "../../../types/metadata";

interface TextFieldProps {
  field: FieldMetadata;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function TextField({ field, value, onChange }: TextFieldProps) {
  const { uiConfig, validationConfig, fieldType } = field;

  return (
    <Input
      placeholder={uiConfig?.placeholder || `Enter ${field.displayName}`}
      value={value}
      onChange={onChange}
      maxLength={validationConfig?.maxLength}
      type={fieldType === "EMAIL" ? "email" : "text"}
    />
  );
}
