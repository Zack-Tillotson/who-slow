/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
