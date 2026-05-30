import React from "react";
import { Result } from "antd";

export default function InboxPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '60vh' }}>
      <Result
        status="info"
        title="Inbox"
        subTitle="This is your Inbox placeholder. No new messages."
      />
    </div>
  );
}
