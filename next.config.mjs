/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  sassOptions: {
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
