"use client";

import React, { useMemo } from "react";
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { EntityMetadata, FieldMetadata } from "../../types/metadata";
import { TextField } from "./fields/TextField";
import { EnumField } from "./fields/EnumField";
import { CurrencyField } from "./fields/CurrencyField";
import { RelationField } from "./fields/RelationField";

interface DynamicFormProps {
  entity: EntityMetadata;
  onSubmit: (data: FieldValues) => void;
  defaultValues?: DefaultValues<FieldValues>;
}

export function DynamicForm({ entity, onSubmit, defaultValues }: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // Group fields by section
  const sections = useMemo(() => {
    const grouped: Record<string, FieldMetadata[]> = {};
    entity.fields.forEach((field) => {
      const sectionName = field.uiConfig?.section || "default";
      if (!grouped[sectionName]) {
        grouped[sectionName] = [];
      }
      grouped[sectionName].push(field);
    });
    return grouped;
  }, [entity]);

  // Helper to get Tailwind grid span class
  const getColSpan = (width?: string) => {
    switch (width) {
      case "full":
        return "col-span-12";
      case "half":
        return "col-span-12 sm:col-span-6";
      case "quarter":
        return "col-span-12 sm:col-span-6 md:col-span-3";
      default:
        return "col-span-12"; // Default to full width
    }
  };

  const renderField = (field: FieldMetadata) => {
    const props = { field, register, error: errors[field.name] };

    switch (field.fieldType) {
      case "TEXT":
      case "EMAIL":
        return <TextField key={field.name} {...props} />;
      case "ENUM":
        return <EnumField key={field.name} {...props} />;
      case "CURRENCY":
        return <CurrencyField key={field.name} {...props} />;
      case "RELATION":
        return <RelationField key={field.name} {...props} />;
      default:
        // Fallback for unhandled types
        return <TextField key={field.name} {...props} />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {Object.entries(sections).map(([sectionKey, fields]) => (
        <div
          key={sectionKey}
          className="rounded-xl border border-gray-100 bg-white/70 p-6 shadow-sm backdrop-blur-md"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-800 capitalize">
            {sectionKey} Information
          </h3>
          <div className="grid grid-cols-12 gap-6">
            {fields.map((field) => (
              <div
                key={field.name}
                className={getColSpan(field.uiConfig?.width)}
              >
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save {entity.displayName}
        </button>
      </div>
    </form>
  );
}
