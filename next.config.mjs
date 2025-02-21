const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProduction ? 'export' : 'standalone', // SSG build type

  trailingSlash: true,
  sassOptions: {
  },
  images: { 
    unoptimized: true,
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
