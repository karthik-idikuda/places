/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      'maps.googleapis.com', 
      'maps.gstatic.com',
      'images.unsplash.com',
      'randomuser.me',
      'upload.wikimedia.org',
      'www.google.com',
      'img-prod-cms-rt-microsoft-com.akamaized.net',
      'assets.vercel.com',
      'lh3.googleusercontent.com' // Google profile images
    ],
  },
}

module.exports = nextConfig
