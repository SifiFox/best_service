import type { MetadataRoute } from 'next';

import { serviceApi } from '@/entities/service/api/service-api';
import { siteSeo } from '@/seo/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteSeo.siteUrl.replace(/\/$/, '');

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1, lastModified: now },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
  ];

  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await serviceApi.getServiceCategories();
    categoryRoutes = categories.map(cat => ({
      url: `${baseUrl}/services/${cat.id}`,
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: now,
    }));
  } catch {
    // ignore API errors, keep static routes
  }

  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await serviceApi.getServiceCategories();
    const serviceIds: number[] = [];
    for (const cat of categories) {
      const items = await serviceApi.getServicesByCategory(cat.id);
      for (const item of items) serviceIds.push(item.id);
    }
    serviceRoutes = serviceIds.map(id => ({
      url: `${baseUrl}/services/${id}/${id}`.replace(/\/\//g, '/'),
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: now,
    }));
  } catch {
    // ignore
  }

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes];
}
