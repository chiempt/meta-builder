"use client";

import React, { ReactNode } from "react";
import { Flex, Typography, theme } from "antd";

const { Title, Text } = Typography;

interface AuthSplitLayoutProps {
  children: ReactNode;
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  const { token } = theme.useToken();

  return (
    <Flex style={{ minHeight: "100vh", width: "100%" }}>
      {/* Left Panel - Branding & Welcome */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorInfoActive || '#2f54eb'} 100%)`,
          color: "white",
          padding: "64px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative elements - simple interpretation of the curves in the design */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: -50, right: -150, width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, right: -200, width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Logo / Asterisk Icon */}
          <div style={{ fontSize: 64, marginBottom: 24, lineHeight: 1 }}>*</div>

          <Title style={{ color: "white", fontSize: 56, marginTop: 0, marginBottom: 24, fontWeight: 700 }}>
            Hello<br />MetaBuilder! 👋
          </Title>

          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, maxWidth: 480, lineHeight: 1.6 }}>
            Skip repetitive and manual metadata tasks. Get highly productive through automation and save tons of time!
          </Text>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Text style={{ color: "rgba(255,255,255,0.6)" }}>
            © {new Date().getFullYear()} MetaBuilder. All rights reserved.
          </Text>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div
        style={{
          flex: 1,
          background: token.colorBgContainer,
          display: "flex",
          flexDirection: "column",
          padding: "48px 64px"
        }}
      >
        {/* Brand Header */}
        <div style={{ marginBottom: "auto" }}>
          <Title level={3} style={{ margin: 0, fontWeight: 800 }}>MetaBuilder</Title>
        </div>

        {/* Form Area */}
        <div style={{ maxWidth: 400, width: "100%", margin: "0 auto", marginTop: "auto", marginBottom: "auto" }}>
          {children}
        </div>
      </div>
    </Flex>
  );
}
