"use client";

import React, { useMemo } from "react";
import { Form, Card, Row, Col, Button, Space, Flex, Typography } from "antd";
import type { Rule } from "antd/es/form";
import { EntityMetadata, FieldMetadata } from "../../types/metadata";
import { TextField } from "./fields/TextField";
import { EnumField } from "./fields/EnumField";
import { CurrencyField } from "./fields/CurrencyField";
import { RelationField } from "./fields/RelationField";

const { Title } = Typography;

interface DynamicFormProps {
  entity: EntityMetadata;
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
}

export function DynamicForm({ entity, onSubmit, defaultValues }: DynamicFormProps) {
  const [form] = Form.useForm();

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

  // Map metadata width to antd Col span (24-column grid)
  const getColSpan = (width?: string) => {
    switch (width) {
      case "full":
        return 24;
      case "half":
        return 12;
      case "quarter":
        return 6;
      default:
        return 24;
    }
  };

  // Build antd Form.Item rules from field metadata
  const buildRules = (field: FieldMetadata): Rule[] => {
    const rules: Rule[] = [];

    if (field.isRequired) {
      rules.push({ required: true, message: `${field.displayName} là bắt buộc` });
    }

    if (field.validationConfig?.minLength) {
      rules.push({
        min: field.validationConfig.minLength,
        message: `Tối thiểu ${field.validationConfig.minLength} ký tự`,
      });
    }

    if (field.validationConfig?.maxLength) {
      rules.push({
        max: field.validationConfig.maxLength,
        message: `Tối đa ${field.validationConfig.maxLength} ký tự`,
      });
    }

    if (field.validationConfig?.pattern) {
      rules.push({
        pattern: new RegExp(field.validationConfig.pattern),
        message: "Định dạng không hợp lệ",
      });
    }

    if (field.validationConfig?.format === "email") {
      rules.push({ type: "email", message: "Email không hợp lệ" });
    }

    return rules;
  };

  const renderField = (field: FieldMetadata) => {
    switch (field.fieldType) {
      case "TEXT":
      case "EMAIL":
        return <TextField field={field} />;
      case "ENUM":
        return <EnumField field={field} />;
      case "CURRENCY":
        return <CurrencyField field={field} />;
      case "RELATION":
        return <RelationField field={field} />;
      default:
        return <TextField field={field} />;
    }
  };

  const handleFinish = (values: Record<string, unknown>) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={defaultValues}
      scrollToFirstError
      requiredMark="optional"
    >
      <Flex vertical gap={24} style={{ width: "100%" }}>
        {Object.entries(sections).map(([sectionKey, fields]) => (
          <Card
            key={sectionKey}
            bordered={false}
            title={
              <Title level={5} style={{ margin: 0, color: "#0f172a", fontWeight: 700 }}>
                {`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} Information`}
              </Title>
            }
            styles={{
              header: {
                borderBottom: "1px dashed #e2e8f0",
                padding: "20px 32px"
              },
              body: {
                padding: "32px"
              }
            }}
            style={{
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
              borderRadius: 24,
              overflow: "hidden"
            }}
          >
            <Row gutter={[24, 8]}>
              {fields.map((field) => (
                <Col key={field.name} span={getColSpan(field.uiConfig?.width)}>
                  <Form.Item
                    name={field.name}
                    label={<span style={{ fontWeight: 500, color: "#475569" }}>{field.displayName}</span>}
                    rules={buildRules(field)}
                  >
                    {renderField(field)}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Card>
        ))}

        <Row justify="end">
          <Space size="middle">
            <Button size="large" onClick={() => form.resetFields()}>
              Cancel
            </Button>
            <Button size="large" type="primary" htmlType="submit">
              Save {entity.displayName}
            </Button>
          </Space>
        </Row>
      </Flex>
    </Form>
  );
}
