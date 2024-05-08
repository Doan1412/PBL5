/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    clientId: process.env.clientId,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },

};

export default nextConfig;
