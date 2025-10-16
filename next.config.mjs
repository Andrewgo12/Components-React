/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    domains: [],
  },
  allowedDevOrigins: [
    'http://localhost:3001',
    'https://localhost:3001',
    'http://192.168.56.1:3001',
    'https://192.168.56.1:3001',
  ],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
