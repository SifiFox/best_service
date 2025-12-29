import React from 'react';

type JsonLdProps<T> = {
  data: T;
};

export function JsonLd<T>({ data }: JsonLdProps<T>) {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '8(800) 222-49-12',
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: ['Russian'],
      },
    ],
    logo: '/images/logo.png',
    name: 'Лучший сервис',
    sameAs: [
      'https://ok.ru/group/70000030894681',
      'https://t.me/indystriyaservisa',
      'https://vk.com/industriya_service',
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  } as const;
}

export function getWebSiteJsonLd() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Лучший сервис',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/services?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    url,
  } as const;
}
