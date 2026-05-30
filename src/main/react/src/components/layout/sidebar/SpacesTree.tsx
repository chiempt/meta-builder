"use client";

import React, { useState } from "react";
import { Flex } from "antd";
import { 
  CaretRightOutlined, 
  CaretDownOutlined, 
  FolderOutlined, 
  UnorderedListOutlined,
  PlusOutlined,
  MoreOutlined
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { mockSpaces, SpaceItemType, FolderItem, ListItem } from "../../../lib/data/spacesMock";
import { useAppTheme } from "../../theme/ThemeProvider";

export function SpacesTree() {
  const pathname = usePathname();
  const router = useRouter();
  const workspaceId = pathname.split('/')[1] || "1";
  
  const [expandedSpaces, setExpandedSpaces] = useState<Record<string, boolean>>({ "spc-1": true });
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ "fld-1": true });
  
  const toggleSpace = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSpaces(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const toggleFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigate = (path: string) => {
    router.push(`/${workspaceId}${path}`);
  };

  // Helper component for Hover states
  const TreeItem = ({ 
    icon, label, isExpanded, onToggle, onClick, indent = 0, isActive = false, color = "#888" 
  }: any) => {
    const { isDarkMode } = useAppTheme();
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <Flex 
        align="center" 
        justify="space-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{ 
          padding: `6px 12px 6px ${12 + indent * 16}px`, 
          cursor: "pointer",
          background: isActive ? (isDarkMode ? "#2c2c2c" : "#e6f7ff") : (isHovered ? (isDarkMode ? "#222" : "#f5f5f5") : "transparent"),
          borderRadius: 6,
          margin: "2px 8px",
          color: isActive ? (isDarkMode ? "#fff" : "#1890ff") : (isDarkMode ? "#ccc" : "#333"),
        }}
      >
        <Flex align="center" gap={8} style={{ overflow: "hidden" }}>
          {onToggle && (
            <div onClick={onToggle} style={{ width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
              {isExpanded ? <CaretDownOutlined style={{ fontSize: 10 }} /> : <CaretRightOutlined style={{ fontSize: 10 }} />}
            </div>
          )}
          {!onToggle && <div style={{ width: 14 }} />} {/* Spacer */}
          
          <div style={{ color }}>{icon}</div>
          <span style={{ fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {label}
          </span>
        </Flex>

        {isHovered && (
          <Flex gap={8} onClick={e => e.stopPropagation()} style={{ color: "#888" }}>
            <PlusOutlined style={{ fontSize: 12 }} />
            <MoreOutlined style={{ fontSize: 12 }} />
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <div style={{ marginTop: 8 }}>
      {mockSpaces.map(space => {
        const isSpaceExpanded = expandedSpaces[space.id];
        
        return (
          <div key={space.id}>
            <TreeItem 
              icon={<div style={{ width: 14, height: 14, borderRadius: 3, background: space.color }} />}
              label={space.name}
              isExpanded={isSpaceExpanded}
              onToggle={(e: any) => toggleSpace(space.id, e)}
              onClick={() => handleNavigate(`/space/${space.id}`)}
              isActive={pathname.includes(`/space/${space.id}`)}
            />
            
            {isSpaceExpanded && (
              <>
                {space.folders.map(folder => {
                  const isFolderExpanded = expandedFolders[folder.id];
                  return (
                    <div key={folder.id}>
                      <TreeItem 
                        indent={1}
                        icon={<FolderOutlined />}
                        label={folder.name}
                        isExpanded={isFolderExpanded}
                        onToggle={(e: any) => toggleFolder(folder.id, e)}
                        onClick={() => handleNavigate(`/folder/${folder.id}`)}
                        isActive={pathname.includes(`/folder/${folder.id}`)}
                      />
                      
                      {isFolderExpanded && folder.lists.map(list => (
                        <TreeItem 
                          key={list.id}
                          indent={2}
                          icon={<UnorderedListOutlined />}
                          label={list.name}
                          onClick={() => handleNavigate(`/list/${list.id}`)}
                          isActive={pathname.includes(`/list/${list.id}`)}
                          color={list.color || "#888"}
                        />
                      ))}
                    </div>
                  );
                })}
                
                {space.lists.map(list => (
                  <TreeItem 
                    key={list.id}
                    indent={1}
                    icon={<UnorderedListOutlined />}
                    label={list.name}
                    onClick={() => handleNavigate(`/list/${list.id}`)}
                    isActive={pathname.includes(`/list/${list.id}`)}
                    color={list.color || "#888"}
                  />
                ))}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
