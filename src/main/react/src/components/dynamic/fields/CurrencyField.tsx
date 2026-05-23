import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { FieldMetadata } from "../../../types/metadata";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";

interface CurrencyFieldProps {
  field: FieldMetadata;
  register: UseFormRegister<FieldValues>;
  error?: { message?: string };
}

export function CurrencyField({ field, register, error }: CurrencyFieldProps) {
  const { name, displayName, uiConfig, isRequired, currencyConfig } = field;
  const currency = currencyConfig?.currency || "VND";
  
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {displayName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type="number"
          placeholder={uiConfig?.placeholder || "0"}
          {...register(name, { required: isRequired ? `${displayName} is required` : false })}
          className={error ? "border-red-500 focus:ring-red-500/10 pr-12" : "pr-12"}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{currency}</span>
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
