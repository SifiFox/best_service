import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['https'],
    serverActions: {
      allowedOrigins: [
        'http://localhost:3000',
        'https://idea-it.ru',
        'http://193.150.103.79:8777',
        'https://193.150.103.79:8777',
        'https://service-industry.ru',
        'http://service-industry.ru',
      ],
    },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // Ensure '@' alias resolves to './src'
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd(), 'src'),
    };

    return config;
  },
  images: {
    // Разрешённые домены без протоколов
    domains: ['localhost', '193.150.103.79', 'idea-it.ru', 'service-industry.ru'],
    // Явные шаблоны удалённых источников (включая порт)
    remotePatterns: [
      { protocol: 'https', hostname: 'idea-it.ru' },
      { protocol: 'https', hostname: 'service-industry.ru' },
      { protocol: 'http', hostname: 'service-industry.ru' },
      { protocol: 'http', hostname: '193.150.103.79', port: '8777' },
      { protocol: 'https', hostname: '193.150.103.79', port: '8777' },
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

export default withBundleAnalyzer(nextConfig);
