/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['drive.google.com', 
                '127.0.0.1', 
                '127.0.0.1:8000', 
                '//drive.google.com',
                '/drive.google.com',
                'https://drive.google.com',
                'https://drive.google.com/uc',
                'https://drive.google.com/', 
                'https://drive.google.com/uc?export=view&id='],
  }
  }
  
  module.exports = nextConfig
  