import React from "react";
import { Select, Tag } from "antd";
import { FieldMetadata } from "../../../types/metadata";

interface EnumFieldProps {
  field: FieldMetadata;
  value?: string;
  onChange?: (value: string) => void;
}

export function EnumField({ field, value, onChange }: EnumFieldProps) {
  const { displayName, enumConfig } = field;
  const options = enumConfig?.options || [];

  return (
    <Select
      placeholder={`Chọn ${displayName}`}
      value={value}
      onChange={onChange}
      allowClear
      options={options.map((opt) => ({
        value: opt.value,
        label: opt.color ? (
          <Tag color={opt.color} bordered={false}>
            {opt.label}
          </Tag>
        ) : (
          opt.label
        ),
      }))}
    />
  );
}
