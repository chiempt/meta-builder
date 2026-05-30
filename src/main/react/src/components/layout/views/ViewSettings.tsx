import React from "react";
import { Flex, Button, theme } from "antd";
import { FilterOutlined, SortAscendingOutlined, GroupOutlined, SettingOutlined } from "@ant-design/icons";

export function ViewSettings() {
  const {
    token: { colorTextBase },
  } = theme.useToken();

  return (
    <Flex gap={8} align="center">
      <Button type="text" size="small" icon={<FilterOutlined />} style={{ color: colorTextBase, fontSize: 12 }}>Filter</Button>
      <Button type="text" size="small" icon={<SortAscendingOutlined />} style={{ color: colorTextBase, fontSize: 12 }}>Sort</Button>
      <Button type="text" size="small" icon={<GroupOutlined />} style={{ color: colorTextBase, fontSize: 12 }}>Group</Button>
      <Button type="text" size="small" icon={<SettingOutlined />} style={{ color: colorTextBase, fontSize: 12 }}>Customize</Button>
    </Flex>
  );
}
