"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  fullName: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedFullName = localStorage.getItem("fullName");

    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setFullName(storedFullName);
    } else {
      setIsAuthenticated(false);
      // Redirect to login if accessing protected routes
      if (pathname && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        router.replace('/login');
      }
    }
    setIsLoading(false);
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    setIsAuthenticated(false);
    setUsername(null);
    setFullName(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, username, fullName, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
