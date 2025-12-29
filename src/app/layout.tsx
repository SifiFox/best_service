import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import '@radix-ui/themes/styles.css';
import '@/components/radix-theme-override.css';
import './globals.css';
import './fonts.css';

import FloatingButtons from '@/components/floating-buttons/floating-buttons';
import NextNProgressClient from '@/components/next-progress/next-progress';
import Footer from '@/components/ui/footer';

import MainLayout from '@/app/main-layout';
import YandexMetrika from '@/seo/analytics/yandex-metrika';
import { siteSeo } from '@/seo/config';
import Header from '@/widgets/header/header';

import { involveFont, rfDewiFont } from './fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL(siteSeo.siteUrl),
  title: {
    default: siteSeo.siteName,
    template: '%s | ' + siteSeo.siteName,
  },
  description: siteSeo.siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteSeo.locale,
    url: '/',
    siteName: siteSeo.siteName,
    title: siteSeo.siteName,
    description: siteSeo.siteDescription,
    images: [{ url: siteSeo.defaultOgImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteSeo.siteName,
    description: siteSeo.siteDescription,
    images: [siteSeo.defaultOgImage],
  },
  keywords: siteSeo.keywords,
  icons: {
    icon: [{ url: '/icons/logo.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
    apple: [{ url: '/icons/logo.svg' }],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${involveFont.variable} ${rfDewiFont.variable}`} lang="ru">
      <head>
        <YandexMetrika id={99141967} />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Theme
            accentColor="indigo"
            appearance="light"
            hasBackground={false}
            panelBackground="solid"
            radius="medium"
            scaling="100%"
          >
            <Suspense fallback={null}>
              <NextNProgressClient />
            </Suspense>
            <div className="flex h-full min-h-screen w-full flex-col">
              <Header />
              <MainLayout>{children}</MainLayout>
              <div className="flex flex-col items-center">
                <Footer />
              </div>
            </div>
            <FloatingButtons />
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
