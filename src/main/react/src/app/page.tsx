"use client";

import { EntityMetadata } from "../types/metadata";
import { DynamicForm } from "../components/dynamic/DynamicForm";
import { LayoutTemplate } from "lucide-react";

const customerEntity: EntityMetadata = {
  id: "uuid-entity-001",
  tenantId: "tenant-acme",
  name: "customer",
  displayName: "Khách hàng",
  tableName: "dyn_customer",
  version: 3,
  metaConfig: {
    icon: "ti-users",
    color: "#3B8BD4",
    searchable: true,
    softDelete: true,
    auditEnabled: true,
    defaultSort: { field: "createdAt", direction: "DESC" },
  },
  fields: [
    {
      name: "fullName",
      displayName: "Họ và tên",
      fieldType: "TEXT",
      isRequired: true,
      isSearchable: true,
      uiConfig: {
        placeholder: "Nhập họ và tên",
        width: "full",
        section: "basic",
      },
      validationConfig: {
        minLength: 2,
        maxLength: 255,
        pattern: null,
      },
    },
    {
      name: "email",
      displayName: "Email",
      fieldType: "EMAIL",
      isRequired: true,
      isUnique: true,
      uiConfig: {
        width: "half",
        section: "contact",
      },
      validationConfig: {
        format: "email",
      },
    },
    {
      name: "status",
      displayName: "Trạng thái",
      fieldType: "ENUM",
      isRequired: true,
      defaultValue: "LEAD",
      uiConfig: {
        renderAs: "badge",
        width: "quarter",
      },
      enumConfig: {
        options: [
          { value: "LEAD", label: "Tiềm năng", color: "blue" },
          { value: "ACTIVE", label: "Đang hoạt động", color: "green" },
          { value: "CHURNED", label: "Đã rời bỏ", color: "red" },
        ],
      },
    },
    {
      name: "assignedTo",
      displayName: "Người phụ trách",
      fieldType: "RELATION",
      relationConfig: {
        targetEntity: "app_user",
        relationType: "MANY_TO_ONE",
        displayField: "fullName",
        filterByCurrentUser: false,
      },
      permissionConfig: {
        visibleRoles: ["ADMIN", "MANAGER"],
        editableRoles: ["ADMIN", "MANAGER"],
      },
      uiConfig: {
        section: "basic",
        width: "half",
      }
    },
    {
      name: "revenue",
      displayName: "Doanh thu dự kiến",
      fieldType: "CURRENCY",
      currencyConfig: {
        currency: "VND",
        precision: 0,
      },
      uiConfig: {
        section: "financial",
        aggregatable: true,
        aggregations: ["SUM", "AVG"],
        width: "half"
      },
    },
  ],
};

export default function Home() {
  const handleSubmit = (data: Record<string, unknown>) => {
    alert("Form submitted: " + JSON.stringify(data, null, 2));
    console.log(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <LayoutTemplate className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dynamic Metadata Builder
            </h1>
            <p className="text-sm text-gray-500">
              Rendering `{customerEntity.name}` entity from JSON schema.
            </p>
          </div>
        </div>

        <DynamicForm entity={customerEntity} onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
