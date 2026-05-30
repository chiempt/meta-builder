"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to last active workspace or default '1'
    const storedId = localStorage.getItem("activeWorkspaceId") || "1";
    router.replace(`/${storedId}/home`);
  }, [router]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spin size="large" />
    </div>
  );
}
