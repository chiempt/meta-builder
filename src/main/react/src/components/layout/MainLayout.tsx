"use client";

import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";
import { WorkspaceProvider } from "../../lib/contexts/WorkspaceContext";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  workspaceId: string;
}

export function MainLayout({ children, workspaceId }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <WorkspaceProvider initialWorkspaceId={workspaceId}>
      <Layout style={{ minHeight: "100vh", background: colorBgLayout }}>
        {/* Decoupled Sidebar */}
        <Sidebar collapsed={collapsed} />

        {/* Main Content Area */}
        <Layout style={{ marginLeft: collapsed ? 80 : 250, background: colorBgLayout, transition: "margin-left 0.2s" }}>

          {/* Decoupled Header */}
          <Header collapsed={collapsed} onCollapseToggle={() => setCollapsed(!collapsed)} />

          <Content style={{ padding: 0 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </WorkspaceProvider>
  );
}
