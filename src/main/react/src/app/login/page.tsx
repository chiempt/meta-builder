"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider, message, theme } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { AuthSplitLayout } from "../../components/auth/AuthSplitLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/apiClient";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = theme.useToken();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('fullName', data.fullName || '');
      message.success('Welcome back!');

      const storedId = localStorage.getItem("activeWorkspaceId") || "1";
      router.replace(`/${storedId}/home`);
    } catch (error: any) {
      message.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <Title level={2} style={{ marginBottom: 8, fontWeight: 700 }}>Welcome Back!</Title>
      <Text style={{ display: "block", marginBottom: 32, color: token.colorTextSecondary }}>
        Don't have an account? <Link href="/register" style={{ fontWeight: 600 }}>Create a new account now</Link>, it's FREE! Takes less than a minute.
      </Text>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email format' }]}
        >
          <Input placeholder="name@company.com" size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{ borderRadius: 8, fontWeight: 600, height: 48 }}
          >
            Login Now
          </Button>
        </Form.Item>

        <Button
          size="large"
          block
          icon={<GoogleOutlined style={{ color: "#EA4335" }} />}
          style={{ borderRadius: 8, fontWeight: 600, height: 48 }}
        >
          Login with Google
        </Button>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Text style={{ color: token.colorTextTertiary }}>
            Forget password <Link href="#" style={{ fontWeight: 600, color: token.colorTextBase }}>Click here</Link>
          </Text>
        </div>
      </Form>
    </AuthSplitLayout>
  );
}
