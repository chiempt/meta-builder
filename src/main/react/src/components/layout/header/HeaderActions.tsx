import React from "react";
import { Flex, Button, Avatar, theme, Dropdown, MenuProps } from "antd";
import { RobotOutlined, ShareAltOutlined, BulbOutlined, BulbFilled, LogoutOutlined } from "@ant-design/icons";
import { useAppTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../../lib/contexts/AuthContext";

export function HeaderActions() {
  const { isDarkMode, toggleTheme } = useAppTheme();
  const { logout } = useAuth();
  const {
    token: { colorTextBase },
  } = theme.useToken();

  const userMenu: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <Flex align="center" gap={16}>
      <Button type="text" icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />} onClick={toggleTheme} style={{ color: colorTextBase }} />
      <Button type="text" icon={<RobotOutlined />} style={{ color: colorTextBase }}>Ask AI</Button>
      <Button type="text" icon={<ShareAltOutlined />} style={{ color: colorTextBase }}>Share</Button>
      <Dropdown menu={{ items: userMenu }} trigger={['click']} placement="bottomRight">
        <Avatar size={28} src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" style={{ cursor: "pointer" }} />
      </Dropdown>
    </Flex>
  );
}
