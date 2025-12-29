import type { Metadata } from 'next';

import { serviceApi } from '@/entities/service/api/service-api';

import { siteSeo } from './config';

export async function getCategoryMetadata(categoryId: number): Promise<Metadata> {
  let name = `Категория ${categoryId}`;
  let img: string | null = null;
  // попробуем достать из сгруппированных услуг (совпадает с логикой страницы)
  try {
    const grouped = await serviceApi.getGroupedServices();
    for (const department of grouped) {
      const cat = department.type.find(t => t.id === categoryId);
      if (cat) {
        name = cat.name;
        // @ts-ignore бек может отдавать img_header
        img = cat.img_header || null;
        break;
      }
    }
  } catch {
    // ignore
  }
  // fallback на список категорий
  if (!img || name === `Категория ${categoryId}`) {
    try {
      const categories = await serviceApi.getServiceCategories();
      const found = categories.find(c => c.id === categoryId);
      if (found) {
        name = found.name;
        // @ts-ignore
        img = found.img_header || null;
      }
    } catch {
      // ignore
    }
  }

  const title = name;
  const description = `Услуги категории «${name}». Закажите ремонт онлайн.`;
  const url = `${siteSeo.siteUrl.replace(/\/$/, '')}/services/${categoryId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: img ? [{ url: img }] : [{ url: siteSeo.defaultOgImage }],
      type: 'website',
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
    },
  };
}

export function getServicesListMetadata(): Metadata {
  const title = 'Все услуги — ремонт техники, выезд мастера, диагностика';
  const description =
    'Каталог услуг по ремонту бытовой техники: выезд мастера, диагностика, установка. Онлайн-запись, гарантия на ремонт.';
  const url = `${siteSeo.siteUrl.replace(/\/$/, '')}/services`;
  return {
    title,
    description,
    keywords: siteSeo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: siteSeo.defaultOgImage }],
      type: 'website',
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
    },
  };
}
