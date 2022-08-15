/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "chirp-backend-flaslam.herokuapp.com",
      "chirp-flaslam.s3.eu-west-2.amazonaws.com",
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
};

module.exports = nextConfig;
