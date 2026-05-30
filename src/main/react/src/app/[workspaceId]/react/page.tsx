import React from "react";
import { Result } from "antd";

export default function ReactMasteryPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '60vh' }}>
      <Result
        status="success"
        title="React Mastery"
        subTitle="This is the React Mastery space. Content coming soon!"
      />
    </div>
  );
}
