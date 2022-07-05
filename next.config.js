/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "chirp-backend-flaslam.herokuapp.com"],
  },
};

module.exports = nextConfig;
