"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message, theme } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { AuthSplitLayout } from "../../components/auth/AuthSplitLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/apiClient";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = theme.useToken();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Email might be in use.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('fullName', data.fullName || '');
      message.success('Account created successfully!');

      const storedId = localStorage.getItem("activeWorkspaceId") || "1";
      router.replace(`/${storedId}/home`);
    } catch (error: any) {
      message.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <Title level={2} style={{ marginBottom: 8, fontWeight: 700 }}>Create an Account!</Title>
      <Text style={{ display: "block", marginBottom: 32, color: token.colorTextSecondary }}>
        Already have an account? <Link href="/login" style={{ fontWeight: 600 }}>Login now</Link> to access your workspaces.
      </Text>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item 
          name="fullName" 
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input placeholder="Full Name (e.g. John Doe)" size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <Form.Item 
          name="username" 
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username (e.g. johndoe)" size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email format' }]}
        >
          <Input placeholder="name@company.com" size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters' }]}
        >
          <Input.Password placeholder="Password (min. 6 characters)" size="large" style={{ borderRadius: 8 }} />
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
            Create Account
          </Button>
        </Form.Item>

        <Button
          size="large"
          block
          icon={<GoogleOutlined style={{ color: "#EA4335" }} />}
          style={{ borderRadius: 8, fontWeight: 600, height: 48 }}
        >
          Sign up with Google
        </Button>
      </Form>
    </AuthSplitLayout>
  );
}
