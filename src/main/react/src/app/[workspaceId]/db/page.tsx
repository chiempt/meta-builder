import React from "react";
import { Result } from "antd";

export default function DatabaseMasteryPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '60vh' }}>
      <Result
        status="warning"
        title="Database Mastery"
        subTitle="This is the Database Mastery space. Content coming soon!"
      />
    </div>
  );
}
