import React from "react";
import { Result } from "antd";

export default function HomeDashboardPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '60vh' }}>
      <Result
        status="info"
        title="Home Dashboard"
        subTitle="This is a placeholder for the Home Dashboard. Navigate to Java Mastery to see the task list prototype."
      />
    </div>
  );
}
