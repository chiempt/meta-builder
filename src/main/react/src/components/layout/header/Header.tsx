"use client";

import React from "react";
import { Layout, theme } from "antd";
import { Breadcrumbs } from "./Breadcrumbs";
import { HeaderActions } from "./HeaderActions";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onCollapseToggle: () => void;
}

export function Header({ collapsed, onCollapseToggle }: HeaderProps) {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: colorBgContainer,
        borderBottom: `1px solid ${colorBorderSecondary}`,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 9,
      }}
    >
      <Breadcrumbs collapsed={collapsed} onCollapseToggle={onCollapseToggle} />
      <HeaderActions />
    </AntHeader>
  );
}
