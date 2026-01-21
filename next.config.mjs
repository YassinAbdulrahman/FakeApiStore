/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'network.com',
        port: '',
        pathname: '/',
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co',
        port: '',
        pathname: '/**',  
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'abcd.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'http',
        hostname: 'test.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
