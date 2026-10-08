import type { NextConfig } from "next";
import { categoryRedirects } from "./data/deals";

const nextConfig: NextConfig = {
  async redirects() { return categoryRedirects; },
};

export default nextConfig;
