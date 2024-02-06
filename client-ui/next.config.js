/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce-rohan-admin.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
