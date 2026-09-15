import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/:path+/index.html", destination: "/:path+", permanent: false },
    ];
  },
};

export default nextConfig;
