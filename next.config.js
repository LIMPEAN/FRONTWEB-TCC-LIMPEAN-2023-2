/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      }
    ]
  },
}


  // module.exports = nextConfig
    // env: {
    //   HOST: process.env.HOST,
    // },
    
    module.exports = {
      ...nextConfig,
      env: {
        HOST: process.env.HOST,
      },
    };