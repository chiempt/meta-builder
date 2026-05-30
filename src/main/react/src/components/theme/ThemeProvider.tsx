"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => { },
});

export const useAppTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load from localStorage on mount (optional, ignoring for simplicity and SSR safety, keeping it simple state-based)
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("app-theme", newTheme ? "dark" : "light");

    // Update body class for global CSS variables if needed
    if (newTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#7B68EE', /* ClickUp Purple/Blue Accent */
            fontFamily: 'Inter, var(--font-geist-sans), sans-serif',
            borderRadius: 6,
            fontSize: 13, /* Dense typography */
            controlHeight: 32, /* Compact controls */
            // We use default generated colors for colorBgContainer/colorBgLayout based on algorithm
            // But we can override specifics if we want stricter ClickUp colors in dark mode.
            colorBgContainer: isDarkMode ? '#1e1e1e' : '#ffffff',
            colorBgLayout: isDarkMode ? '#1A1A1A' : '#f5f6f8',
          },
          components: {
            Card: {
              boxShadowTertiary: 'none',
              headerFontSize: 14,
              borderRadiusLG: 8,
            },
            Button: {
              controlHeight: 32,
              borderRadius: 6,
            },
            Input: {
              controlHeight: 32,
              borderRadius: 6,
            },
            Select: {
              controlHeight: 32,
              borderRadius: 6,
            },
            Menu: {
              itemBorderRadius: 6,
              itemHeight: 32,
              // Let algorithm handle backgrounds, or enforce strict colors
              itemSelectedBg: isDarkMode ? '#2a2a2a' : '#eef2f6',
              itemSelectedColor: isDarkMode ? '#ffffff' : '#7B68EE',
              itemHoverBg: isDarkMode ? '#252525' : '#f8f9fa',
            },
            Table: {
              headerBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
              headerColor: isDarkMode ? '#888888' : '#666666',
              rowHoverBg: isDarkMode ? '#252525' : '#f1f5f9',
              borderColor: isDarkMode ? '#2a2a2a' : '#e2e8f0',
              paddingContentVertical: 8,
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
