/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    // reactStrictMode: true, 
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
}