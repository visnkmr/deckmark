const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  // Ensure trailing slashes for static hosting
  trailingSlash: true,
  // Disable server-side features for static export
  distDir: 'out'
};

module.exports = withPWA(nextConfig);

//updated dec25
