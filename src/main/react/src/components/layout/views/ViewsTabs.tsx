import React from "react";
import { Flex, theme } from "antd";
import { BarsOutlined, FileTextOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";

interface ViewsTabsProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function ViewsTabs({ activeView, setActiveView }: ViewsTabsProps) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const views = [
    { key: "list", icon: <BarsOutlined />, label: "List" },
    { key: "note", icon: <FileTextOutlined />, label: "Note" },
    { key: "calendar", icon: <CalendarOutlined />, label: "Calendar" },
  ];

  return (
    <Flex gap={24}>
      {views.map(view => (
        <div 
          key={view.key}
          onClick={() => setActiveView(view.key)}
          style={{ 
            display: "flex", alignItems: "center", gap: 6, 
            color: activeView === view.key ? colorPrimary : "#888", 
            borderBottom: `2px solid ${activeView === view.key ? colorPrimary : 'transparent'}`, 
            padding: "12px 0", cursor: "pointer", fontWeight: 500, transition: "all 0.2s" 
          }}
        >
          {view.icon} {view.label}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", padding: "12px 0", cursor: "pointer" }}>
        <PlusOutlined /> View
      </div>
    </Flex>
  );
}
