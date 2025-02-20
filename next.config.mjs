/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  sassOptions: {
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
