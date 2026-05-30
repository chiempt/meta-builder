"use client";

import React, { useState } from "react";
import { Table, Tag, Avatar, Flex, theme } from "antd";
import { ViewsTabs } from "../../components/layout/views/ViewsTabs";
import { ViewSettings } from "../../components/layout/views/ViewSettings";
import { ListView } from "./ListView";
import { NoteView } from "./NoteView";
import { CalendarView } from "./CalendarView";
export default function Home() {
  const [activeView, setActiveView] = useState("list");
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  return (
    <div style={{ height: "100%" }}>
      {/* View Tabs Bar */}
      <div style={{ 
        padding: "0 24px", 
        borderBottom: `1px solid ${colorBorderSecondary}`, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        background: colorBgContainer,
        height: 48 
      }}>
        <ViewsTabs activeView={activeView} setActiveView={setActiveView} />
        <ViewSettings />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {activeView === "list" && <ListView />}
        {activeView === "note" && <NoteView />}
        {activeView === "calendar" && <CalendarView />}
      </div>
    </div>
  );
}
