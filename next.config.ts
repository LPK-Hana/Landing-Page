import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    localPatterns: [
      { pathname: "/media/**" },
      { pathname: "/favicon.png" },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/:path+/index.html", destination: "/:path+", permanent: false },
    ];
  },
};

export default nextConfig;
