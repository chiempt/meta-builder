"use client";

import React, { useState } from "react";
import { Dropdown, Flex, Avatar, theme, Spin } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useWorkspace } from "../../../lib/contexts/WorkspaceContext";
import { CreateWorkspaceModal } from "../../workspace/CreateWorkspaceModal";

interface WorkspaceSwitcherProps {
  collapsed: boolean;
}

export function WorkspaceSwitcher({ collapsed }: WorkspaceSwitcherProps) {
  const {
    token: { colorPrimary, colorTextBase },
  } = theme.useToken();

  const { workspaces, activeWorkspace, switchWorkspace, isLoading } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workspaceOptions = [
    ...workspaces.map((w) => ({
      key: w.id,
      label: w.name,
    })),
    { type: "divider" as const },
    {
      key: "add",
      label: (
        <Flex align="center" gap={8} style={{ color: colorPrimary, fontWeight: 500 }}>
          <PlusOutlined /> Add Workspace
        </Flex>
      )
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items: workspaceOptions,
          onClick: (e) => {
            if (e.key === 'add') {
              setIsModalOpen(true);
            } else {
              switchWorkspace(e.key);
            }
          }
        }}
        trigger={["click"]}
        disabled={isLoading}
      >
        <Flex
          align="center"
          gap={8}
          style={{ padding: "8px 12px", cursor: isLoading ? "not-allowed" : "pointer", borderRadius: 6, transition: "background 0.2s" }}
          className="hover:bg-black/10 dark:hover:bg-white/10"
        >
          {isLoading ? (
            <Avatar size={24} shape="square" style={{ background: "transparent", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 16, color: colorPrimary }} spin />} />
            </Avatar>
          ) : (
            <Avatar size={24} shape="square" style={{ background: colorPrimary, borderRadius: 4 }}>
              {activeWorkspace?.name.charAt(0) || "W"}
            </Avatar>
          )}

          {!collapsed && (
            <span style={{ fontWeight: 600, fontSize: 13, color: colorTextBase, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {isLoading ? "Loading..." : activeWorkspace?.name || "Select Workspace"}
            </span>
          )}
        </Flex>
      </Dropdown>

      <CreateWorkspaceModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
