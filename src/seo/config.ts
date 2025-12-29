function resolveBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  const host = process.env.HOST || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}`;
}

export const siteSeo = {
  siteName: 'Лучший сервис',
  siteDescription: 'Ремонт техники с выездом и в сервисных центрах. Закажите мастера онлайн.',
  siteUrl: resolveBaseUrl(),
  defaultOgImage: '/images/banner.png',
  locale: 'ru_RU',
  keywords: [
    'ремонт техники',
    'ремонт бытовой техники',
    'сервисный центр',
    'выезд мастера',
    'срочный ремонт',
    'гарантия на ремонт',
    'установка техники',
    'диагностика техники',
    'ремонт стиральных машин',
    'ремонт холодильников',
    'ремонт посудомоечных машин',
    'ремонт кондиционеров',
    'Москва',
    'Лучший сервис',
  ],
};

export const hreflangs = [{ hrefLang: 'ru', href: '/' }];

export type WithDates = {
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};
