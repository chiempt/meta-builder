import React from "react";
import { MainLayout } from "../../components/layout/MainLayout";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <MainLayout workspaceId={resolvedParams.workspaceId}>
      {children}
    </MainLayout>
  );
}
