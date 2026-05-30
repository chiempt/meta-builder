"use client";

import { Typography, Space, Flex } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { EntityMetadata } from "../types/metadata";
import { DynamicForm } from "../components/dynamic/DynamicForm";

const { Title, Text } = Typography;

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
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Flex align="center" gap={12} style={{ marginBottom: 32 }}>
        <Flex
          align="center"
          justify="center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#1677ff",
            boxShadow: "0 4px 14px rgba(22, 119, 255, 0.25)",
          }}
        >
          <AppstoreOutlined style={{ fontSize: 24, color: "#fff" }} />
        </Flex>
        <Space direction="vertical" size={0}>
          <Title level={3} style={{ margin: 0 }}>
            Dynamic Metadata Builder
          </Title>
          <Text type="secondary">
            Rendering `{customerEntity.name}` entity from JSON schema.
          </Text>
        </Space>
      </Flex>

      <DynamicForm entity={customerEntity} onSubmit={handleSubmit} />
    </div>
  );
}
