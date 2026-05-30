import React from "react";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FieldMetadata } from "../../../types/metadata";

interface RelationFieldProps {
  field: FieldMetadata;
  value?: string;
  onChange?: (value: string) => void;
}

export function RelationField({ field, value, onChange }: RelationFieldProps) {
  const { displayName, relationConfig } = field;

  // In a real app, options would come from an API call to the target entity
  const mockOptions = [
    { value: "user-001", label: "Nguyễn Văn A" },
    { value: "user-002", label: "Trần Thị B" },
    { value: "user-003", label: "Lê Văn C" },
  ];

  return (
    <Select
      showSearch
      placeholder={`Tìm kiếm ${relationConfig?.targetEntity || displayName}...`}
      value={value}
      onChange={onChange}
      allowClear
      suffixIcon={<SearchOutlined />}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={mockOptions}
    />
  );
}
