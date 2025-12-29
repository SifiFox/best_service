import React from 'react';

import { siteSeo } from './config';
import { JsonLd } from './jsonld';

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbsJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const base = siteSeo.siteUrl.replace(/\/$/, '');
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  } as const;
  return <JsonLd data={json} />;
}
