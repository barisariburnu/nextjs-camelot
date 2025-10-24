/** @type {import('next').NextConfig} */
const repoName = "nextjs-camelot";
const isStaticExport = process.env.NEXT_EXPORT === "1";

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  ...(isStaticExport
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig
