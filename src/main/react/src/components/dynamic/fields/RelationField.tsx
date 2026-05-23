import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { FieldMetadata } from "../../../types/metadata";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Search } from "lucide-react";

interface RelationFieldProps {
  field: FieldMetadata;
  register: UseFormRegister<FieldValues>;
  error?: { message?: string };
}

export function RelationField({ field, register, error }: RelationFieldProps) {
  const { name, displayName, uiConfig, isRequired, relationConfig } = field;
  
  // A true relation field would be an autocomplete/combobox.
  // We mock it here with an input and a search icon.
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {displayName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          placeholder={`Search ${relationConfig?.targetEntity || displayName}...`}
          {...register(name, { required: isRequired ? `${displayName} is required` : false })}
          className={error ? "border-red-500 focus:ring-red-500/10 pl-9" : "pl-9"}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
