"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography, theme } from "antd";
import { PlusOutlined, RocketOutlined } from "@ant-design/icons";
import { useWorkspace } from "../../lib/contexts/WorkspaceContext";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateWorkspaceModal({ open, onClose }: CreateWorkspaceModalProps) {
  const [form] = Form.useForm();
  const { createWorkspace } = useWorkspace();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = theme.useToken();

  const handleSubmit = async (values: { name: string; description?: string }) => {
    setIsSubmitting(true);
    try {
      await createWorkspace(values.name, values.description);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Failed to create workspace", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnHidden
      closeIcon={null}
      width={480}
      styles={{
        body: { padding: 0 }
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} 100%)`,
          padding: "32px 24px 24px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            backdropFilter: "blur(10px)"
          }}
        >
          <RocketOutlined style={{ fontSize: 28, color: "#fff" }} />
        </div>
        <Title level={3} style={{ margin: 0, color: "#fff" }}>Create a new workspace</Title>
        <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 14 }}>
          Workspaces are shared environments where your team can collaborate.
        </Text>
      </div>

      <div style={{ padding: "24px 32px 32px", background: token.colorBgContainer }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: 14 }}>Workspace Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter a workspace name" }]}
          >
            <Input
              placeholder="e.g. Acme Corp, Engineering Team"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: 14 }}>Description (Optional)</span>}
            name="description"
          >
            <TextArea
              placeholder="What is this workspace for?"
              rows={3}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 32 }}>
            <Button size="large" onClick={onClose} style={{ borderRadius: 8, fontWeight: 500 }}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              icon={!isSubmitting && <PlusOutlined />}
              style={{ borderRadius: 8, fontWeight: 500 }}
            >
              Create Workspace
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
