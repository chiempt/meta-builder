import React from "react";
import { InputNumber } from "antd";
import { FieldMetadata } from "../../../types/metadata";

interface CurrencyFieldProps {
  field: FieldMetadata;
  value?: number;
  onChange?: (value: number | null) => void;
}

export function CurrencyField({ field, value, onChange }: CurrencyFieldProps) {
  const { uiConfig, currencyConfig } = field;
  const currency = currencyConfig?.currency || "VND";
  const precision = currencyConfig?.precision ?? 0;

  return (
    <InputNumber
      style={{ width: "100%" }}
      placeholder={uiConfig?.placeholder || "0"}
      value={value}
      onChange={onChange}
      precision={precision}
      addonAfter={currency}
      formatter={(val) =>
        val ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
      }
      parser={(val) =>
        val ? Number(val.replace(/,/g, "")) : 0
      }
    />
  );
}
