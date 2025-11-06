import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // This is to allow cross-origin requests from the development environment.
    allowedDevOrigins: [
      'https://6000-firebase-studio-1762089089985.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
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
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
