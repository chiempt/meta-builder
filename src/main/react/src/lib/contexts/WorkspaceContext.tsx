"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiFetch } from "../apiClient";

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
  updateWorkspace: (id: string, name: string, description?: string) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
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

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setIsLoading(true);
      try {
        const response = await apiFetch("/workspace");
        if (response.ok) {
          const data = await response.json();
          const list = data.data || data; // Handle wrapped vs unwrapped response

          if (Array.isArray(list)) {
            const mappedWorkspaces = list.map((item: any) => ({
              id: String(item.id),
              name: item.title || item.name || "Untitled Workspace",
              description: item.description,
              createdAt: item.createdAt || new Date().toISOString()
            }));

            setWorkspaces(mappedWorkspaces);

            if (mappedWorkspaces.length > 0) {
              const targetWorkspace = mappedWorkspaces.find(w => w.id === initialWorkspaceId) || mappedWorkspaces[0];
              setActiveWorkspace(targetWorkspace);
              localStorage.setItem("activeWorkspaceId", targetWorkspace.id);
              if (targetWorkspace.id !== initialWorkspaceId && initialWorkspaceId !== "1") {
                updateUrl(targetWorkspace.id);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      } finally {
        setIsLoading(false);
      }
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
    try {
      const response = await apiFetch("/workspace", {
        method: "POST",
        body: JSON.stringify({ title: name, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create workspace");
      }

      const data = await response.json();

      // Map response to internal Workspace format (assuming data contains id, title/name, etc.)
      const newWorkspace: Workspace = {
        id: String(data.data || data.id || Math.random().toString(36).substring(7)),
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
      };

      setWorkspaces(prev => [...prev, newWorkspace]);
      setActiveWorkspace(newWorkspace);
      localStorage.setItem("activeWorkspaceId", newWorkspace.id);
      updateUrl(newWorkspace.id);
      return newWorkspace;
    } catch (error) {
      console.error("API error creating workspace:", error);
      throw error;
    }
  };

  const updateWorkspace = async (id: string, name: string, description?: string) => {
    try {
      const response = await apiFetch(`/workspace/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: name, description }),
      });

      if (!response.ok) throw new Error("Failed to update workspace");

      setWorkspaces(prev => prev.map(w => w.id === id ? { ...w, name, description } : w));
      if (activeWorkspace?.id === id) {
        setActiveWorkspace(prev => prev ? { ...prev, name, description } : prev);
      }
    } catch (error) {
      console.error("API error updating workspace:", error);
      throw error;
    }
  };

  const deleteWorkspace = async (id: string) => {
    try {
      const response = await apiFetch(`/workspace/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete workspace");

      setWorkspaces(prev => {
        const next = prev.filter(w => w.id !== id);
        if (activeWorkspace?.id === id && next.length > 0) {
          setActiveWorkspace(next[0]);
          localStorage.setItem("activeWorkspaceId", next[0].id);
          updateUrl(next[0].id);
        }
        return next;
      });
    } catch (error) {
      console.error("API error deleting workspace:", error);
      throw error;
    }
  };

  return (
    <WorkspaceContext.Provider value={{ workspaces, activeWorkspace, isLoading, switchWorkspace, createWorkspace, updateWorkspace, deleteWorkspace }}>
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
