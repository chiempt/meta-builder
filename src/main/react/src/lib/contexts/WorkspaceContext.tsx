"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

interface WorkspaceContextProps {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  isLoading: boolean;
  switchWorkspace: (id: string) => void;
  createWorkspace: (name: string, description?: string) => Promise<Workspace>;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode;
  initialWorkspaceId?: string;
}

export function WorkspaceProvider({ children, initialWorkspaceId }: WorkspaceProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUrl = (workspaceId: string) => {
    const parts = pathname.split("/");
    if (parts.length > 1 && parts[1] !== workspaceId) {
      parts[1] = workspaceId; // Replace the first path segment (workspaceId)
      router.push(parts.join("/"));
    }
  };

  // Mock fetching
  useEffect(() => {
    const fetchWorkspaces = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockWorkspaces: Workspace[] = [
        { id: "1", name: "Self Workspace", description: "Personal projects", createdAt: new Date().toISOString() },
        { id: "2", name: "Acme Corp", description: "Company projects", createdAt: new Date().toISOString() },
      ];
      setWorkspaces(mockWorkspaces);
      
      const targetWorkspace = mockWorkspaces.find(w => w.id === initialWorkspaceId) || mockWorkspaces[0];
      
      setActiveWorkspace(targetWorkspace);
      if (targetWorkspace) {
        localStorage.setItem("activeWorkspaceId", targetWorkspace.id);
        if (targetWorkspace.id !== initialWorkspaceId) {
          updateUrl(targetWorkspace.id);
        }
      }
      setIsLoading(false);
    };

    fetchWorkspaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialWorkspaceId]);

  const switchWorkspace = (id: string) => {
    const target = workspaces.find(w => w.id === id);
    if (target) {
      setActiveWorkspace(target);
      localStorage.setItem("activeWorkspaceId", target.id);
      updateUrl(target.id);
    }
  };

  const createWorkspace = async (name: string, description?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newWorkspace: Workspace = {
      id: Math.random().toString(36).substring(7),
      name,
      description,
      createdAt: new Date().toISOString(),
    };
    
    setWorkspaces(prev => [...prev, newWorkspace]);
    setActiveWorkspace(newWorkspace);
    localStorage.setItem("activeWorkspaceId", newWorkspace.id);
    updateUrl(newWorkspace.id);
    return newWorkspace;
  };

  return (
    <WorkspaceContext.Provider value={{ workspaces, activeWorkspace, isLoading, switchWorkspace, createWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
