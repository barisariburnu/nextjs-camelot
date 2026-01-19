/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: "export",
  basePath: "/nextjs-camelot",
  assetPrefix: "/nextjs-camelot/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
