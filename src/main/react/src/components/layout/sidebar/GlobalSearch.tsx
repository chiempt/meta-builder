import React from "react";
import { Input, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAppTheme } from "../../theme/ThemeProvider";

interface GlobalSearchProps {
  collapsed: boolean;
}

export function GlobalSearch({ collapsed }: GlobalSearchProps) {
  const { isDarkMode } = useAppTheme();
  const {
    token: { colorTextBase },
  } = theme.useToken();

  if (collapsed) return null;

  return (
    <Input
      prefix={<SearchOutlined style={{ color: "#888" }} />}
      placeholder="Search"
      style={{
        background: isDarkMode ? "#252525" : "#e2e8f0",
        border: "none",
        marginTop: 16,
        marginBottom: 16,
        color: colorTextBase
      }}
    />
  );
}
