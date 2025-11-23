import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
    
      {
        protocol: "https",
        hostname: "holh1uldewromppp.public.blob.vercel-storage.com",
        
      },
      
    ],
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com"
    ],
  },
};

export default nextConfig;



