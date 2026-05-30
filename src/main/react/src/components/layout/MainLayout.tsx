"use client";

import React, { useState } from "react";
import { Layout, Menu, theme, Typography, Avatar, Dropdown } from "antd";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: "/entities",
      icon: <DatabaseOutlined />,
      label: <Link href="/">Entities</Link>,
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: <Link href="/">Settings</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
            {collapsed ? "MB" : "Meta Builder"}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ borderRight: 0, marginTop: 16 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: "18px", cursor: "pointer" },
          })}

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <BellOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" />
                <span style={{ fontWeight: 500 }}>Admin</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
