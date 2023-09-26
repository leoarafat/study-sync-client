/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    SECRET: process.env.SECRET,
  },
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"],
  },
};

module.exports = nextConfig;
