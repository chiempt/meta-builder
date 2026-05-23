import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { FieldMetadata } from "../../../types/metadata";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";

interface TextFieldProps {
  field: FieldMetadata;
  register: UseFormRegister<FieldValues>;
  error?: { message?: string };
}

export function TextField({ field, register, error }: TextFieldProps) {
  const { name, displayName, uiConfig, validationConfig, isRequired } = field;
  
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {displayName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        placeholder={uiConfig?.placeholder || `Enter ${displayName}`}
        {...register(name, {
          required: isRequired ? `${displayName} is required` : false,
          minLength: validationConfig?.minLength
            ? { value: validationConfig.minLength, message: `Min length is ${validationConfig.minLength}` }
            : undefined,
          maxLength: validationConfig?.maxLength
            ? { value: validationConfig.maxLength, message: `Max length is ${validationConfig.maxLength}` }
            : undefined,
          pattern: validationConfig?.pattern
            ? { value: new RegExp(validationConfig.pattern), message: "Invalid format" }
            : undefined,
        })}
        className={error ? "border-red-500 focus:ring-red-500/10" : ""}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
