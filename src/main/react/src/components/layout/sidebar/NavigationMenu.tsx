"use client";

import React from "react";
import { Menu } from "antd";
import { HomeOutlined, InboxOutlined, CheckSquareOutlined, FileTextOutlined, CalendarOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

interface NavigationMenuProps {
  collapsed: boolean;
}

export function NavigationMenu({ collapsed }: NavigationMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const workspaceId = pathname.split('/')[1] || "1";
  const basePath = `/${workspaceId}`;

  const topMenuItems = [
    { key: `${basePath}/home`, icon: <HomeOutlined />, label: "Home" },
    { key: `${basePath}/inbox`, icon: <InboxOutlined />, label: "Inbox" },
    { key: `${basePath}/tasks`, icon: <CheckSquareOutlined />, label: "Tasks" },
    { key: `${basePath}/docs`, icon: <FileTextOutlined />, label: "Docs (Notes)" },
    { key: `${basePath}/calendar`, icon: <CalendarOutlined />, label: "Calendar" },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={topMenuItems}
      onClick={({ key }) => router.push(key)}
      style={{ background: "transparent", borderRight: 0, marginBottom: 16, marginTop: collapsed ? 16 : 0 }}
    />
  );
}
