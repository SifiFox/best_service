import { Box, Section } from '@radix-ui/themes';
import Link from 'next/link';

import About from '@/components/about/about';
import BlogCarousel from '@/components/blog/blog-carousel';
import Categories from '@/components/categories/categories';
import Feedbacks from '@/components/feedbacks/feedbacks.tsx';
import FormMain from '@/components/forms/form-main/form-main';
import Hero from '@/components/hero/hero.tsx';
import HowItWorks from '@/components/how-it-works/how-it-works.tsx';
import Promotion from '@/components/promotion/promotion.tsx';

import { getOrganizationJsonLd, getWebSiteJsonLd, JsonLd } from '@/seo/jsonld';

export default function Home() {
  return (
    <div className="flex flex-col">
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebSiteJsonLd()} />
      <Section className="p-0!">
        <Box>
          <div className="flex flex-col">
            <Hero />
            <div className="mt-6 flex justify-center md:hidden">
              <Link
                className="flex w-fit items-center gap-2 rounded-md bg-black px-4 py-2 text-white"
                href="https://play.google.com/store/apps/details?id=com.app.masteronhours"
              >
                <img alt="Rustore" className="size-8 object-cover" src="/icons/rustore.svg" />
                <p className="flex flex-col">
                  <span className="text-xs font-medium">Доступно в</span>
                  <span className="text-sm font-bold">Rustore</span>
                </p>
              </Link>
            </div>
          </div>
        </Box>
      </Section>
      <Section className="px-0 md:px-12">
        <Box>
          <div className="flex flex-col">
            <HowItWorks />
          </div>
        </Box>
      </Section>
      <Section className="px-0 md:px-12">
        <Box>
          <div className="flex flex-col">
            <About />
          </div>
        </Box>
      </Section>
      <Section className="overflow-visible px-0 md:px-12">
        <Box className="overflow-visible">
          <div className="flex flex-col overflow-visible">
            <Promotion />
          </div>
        </Box>
      </Section>
      <Section className="px-2 md:px-12 py-0!">
        <Box>
          <div className="flex flex-col gap-8">
            <Categories />
          </div>
        </Box>
      </Section>
      <Section className="px-2 md:px-12 py-0!">
        <Box className="max-w-[100vw]">
          <BlogCarousel />
        </Box>
      </Section>
      <Section className="px-2 md:px-12">
        <Box>
          <div className="flex flex-col">
            <FormMain />
          </div>
        </Box>
      </Section>
      <Section>
        <Box className="max-w-[100vw]">
          <Feedbacks />
        </Box>
      </Section>
    </div>
  );
}
