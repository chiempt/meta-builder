import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { FieldMetadata } from "../../../types/metadata";
import { Select } from "../../ui/Select";
import { Label } from "../../ui/Label";
import { Badge } from "../../ui/Badge";

interface EnumFieldProps {
  field: FieldMetadata;
  register: UseFormRegister<FieldValues>;
  error?: { message?: string };
}

export function EnumField({ field, register, error }: EnumFieldProps) {
  const { name, displayName, uiConfig, isRequired, enumConfig } = field;
  const options = enumConfig?.options || [];
  
  // Note: For a real app, if renderAs="badge" and it's a form, we might use radio buttons 
  // or a custom dropdown that renders badges. For simplicity here, we use a Select but 
  // show you could use Badges in a custom UI wrapper.

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {displayName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <Select
        id={name}
        {...register(name, { required: isRequired ? `${displayName} is required` : false })}
        className={error ? "border-red-500 focus:ring-red-500/10" : ""}
      >
        <option value="">Select {displayName}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
