"use client";

import React from "react";
import { CalendarView } from "../CalendarView";
import { theme } from "antd";

export default function CalendarPage() {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ 
        padding: "0 24px", 
        borderBottom: `1px solid ${colorBorderSecondary}`, 
        display: "flex", 
        alignItems: "center", 
        background: colorBgContainer,
        height: 48,
        fontWeight: 600,
        fontSize: 16
      }}>
        Global Calendar
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <CalendarView />
      </div>
    </div>
  );
}
