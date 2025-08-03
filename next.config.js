/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  images: {
    domains: ['localhost']
  }
}

module.exports = nextConfig