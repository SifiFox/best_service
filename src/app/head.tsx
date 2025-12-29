import React from 'react';

import { hreflangs, siteSeo } from '@/seo/config';
import { getOrganizationJsonLd, getWebSiteJsonLd, JsonLd } from '@/seo/jsonld';

export default function Head() {
  const url = siteSeo.siteUrl;
  return (
    <>
      <meta content="#0d83d0" name="theme-color" />
      <link href="/site.webmanifest" rel="manifest" />
      <link href="/favicon.ico" rel="icon" sizes="any" />
      <link href="/images/logo.png" rel="apple-touch-icon" />
      <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <meta content={siteSeo.siteName} name="application-name" />
      <meta content={siteSeo.siteDescription} name="description" />
      <meta content={siteSeo.siteName} property="og:title" />
      <meta content={siteSeo.siteName} property="og:site_name" />
      <meta content="website" property="og:type" />
      <meta content={siteSeo.locale} property="og:locale" />
      <meta content={siteSeo.defaultOgImage} property="og:image" />
      <meta content={siteSeo.siteDescription} property="og:description" />
      <meta content={url} property="og:url" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={siteSeo.siteName} name="twitter:title" />
      <meta content={siteSeo.siteDescription} name="twitter:description" />
      <meta content={siteSeo.defaultOgImage} name="twitter:image" />
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebSiteJsonLd()} />
      <link href={url} rel="canonical" />
      {hreflangs.map(link => (
        <link href={link.href} hrefLang={link.hrefLang} key={link.hrefLang} rel="alternate" />
      ))}
    </>
  );
}
