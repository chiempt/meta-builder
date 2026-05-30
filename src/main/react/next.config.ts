import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/nextjs-registry'],
};

export default nextConfig;
