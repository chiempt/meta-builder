import React from "react";
import { Flex, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface BreadcrumbsProps {
  collapsed: boolean;
  onCollapseToggle: () => void;
}

export function Breadcrumbs({ collapsed, onCollapseToggle }: BreadcrumbsProps) {
  const {
    token: { colorTextBase },
  } = theme.useToken();

  return (
    <Flex align="center" gap={16}>
      <div style={{ cursor: "pointer", color: "#888" }} onClick={onCollapseToggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <span style={{ color: "#888", fontSize: 13 }}>
        Space / Roadmap 5x / <span style={{ color: colorTextBase, fontWeight: 500 }}>Java Mastery</span>
      </span>
    </Flex>
  );
}
