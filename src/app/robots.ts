import type { MetadataRoute } from 'next';

import { siteSeo } from '@/seo/config';

export default function robots(): MetadataRoute.Robots {
  const host = siteSeo.siteUrl.replace(/\/$/, '');
  const disallow = ['/api/', '/profile', '/cart', '/checkout', '/payment'];
  const allow = ['/images/', '/_next/static/', '/_next/image/'];
  return {
    rules: [
      { userAgent: 'Yandex', allow, disallow },
      { userAgent: 'Googlebot', allow, disallow },
      // Блокируем известных вредоносных/шумных ботов
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'SEOkicks', disallow: '/' },
      { userAgent: 'SEMrushBot', disallow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },
      { userAgent: 'AspiegelBot', disallow: '/' },
      { userAgent: '*', allow, disallow },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
