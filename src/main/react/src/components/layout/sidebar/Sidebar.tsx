"use client";

import React from "react";
import { Layout, Flex, Divider, theme } from "antd";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { GlobalSearch } from "./GlobalSearch";
import { NavigationMenu } from "./NavigationMenu";
import { SpacesTree } from "./SpacesTree";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SearchOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const { isDarkMode } = useAppTheme();
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = pathname.split('/')[1] || "1";

  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  const sidebarBg = isDarkMode ? "#1f1f1f" : "#f7f8f9"; // ClickUp uses slight gray in light mode, very dark in dark mode
  const isEverythingActive = pathname.endsWith('/everything');

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed} 
      width={250}
      style={{ 
        background: sidebarBg,
        borderRight: `1px solid ${colorBorderSecondary}`,
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <Flex vertical style={{ height: "100%", padding: "12px 8px" }}>
        
        <WorkspaceSwitcher collapsed={collapsed} />
        
        <GlobalSearch collapsed={collapsed} />

        <NavigationMenu collapsed={collapsed} />

        <Divider style={{ margin: "8px 0", borderColor: colorBorderSecondary }} />

        {!collapsed && (
          <div style={{ marginTop: 8 }}>
            {/* EVERYTHING BUTTON */}
            <Flex 
              align="center"
              gap={12}
              onClick={() => router.push(`/${workspaceId}/everything`)}
              style={{
                padding: "8px 12px",
                margin: "0 8px 16px 8px",
                cursor: "pointer",
                background: isEverythingActive ? (isDarkMode ? "#2c2c2c" : "#e6f7ff") : "transparent",
                color: isEverythingActive ? (isDarkMode ? "#fff" : "#1890ff") : (isDarkMode ? "#ccc" : "#333"),
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              <UnorderedListOutlined style={{ fontSize: 16 }} />
              <span style={{ fontSize: 14 }}>Everything</span>
            </Flex>

            {/* SPACES HEADER */}
            <Flex 
              align="center" 
              justify="space-between" 
              style={{ 
                padding: "4px 16px", 
                color: "#888", 
                fontSize: 11, 
                fontWeight: 600, 
                letterSpacing: 0.5,
              }}
            >
              <span>SPACES</span>
              <Flex gap={8}>
                <SearchOutlined style={{ cursor: "pointer" }} />
                <PlusOutlined style={{ cursor: "pointer" }} />
              </Flex>
            </Flex>
          </div>
        )}
        
        {!collapsed && <SpacesTree />}
        
      </Flex>
    </Sider>
  );
}
