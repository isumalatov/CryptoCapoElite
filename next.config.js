/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'k2765olfeaj2cexa.public.blob.vercel-storage.com',
          port: '',
        },
      ],
    },
  };
   
  module.exports = nextConfig;