/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cryptocapoelite.s3.amazonaws.com',
          port: '',
        },
      ],
    },
  };
   
  module.exports = nextConfig;