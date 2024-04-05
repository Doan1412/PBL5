/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    clientId: process.env.clientId,
  },
};

export default nextConfig;
