import React from "react";
import { Result } from "antd";

export default function AssignedPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '60vh' }}>
      <Result
        status="info"
        title="Assigned Comments"
        subTitle="You have no assigned comments at this time."
      />
    </div>
  );
}
