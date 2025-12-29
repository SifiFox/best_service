import { Section } from '@radix-ui/themes';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ContentRenderer } from '@/components/blog/content-renderer';
import { Badge } from '@/components/ui/badge';

import { rfDewiFont } from '@/app/fonts';
import { BLOG_POSTS } from '@/entities/blog/data';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <Section className="px-4 pb-20 md:px-10">
      <div className="mx-auto pt-10 md:pt-32">
        <div className="mb-8 flex flex-col gap-6">
          <Link
            className="hover:text-primary flex w-fit items-center gap-2 text-xl md:text-2xl font-medium text-gray-500 transition-colors"
            href="/blog"
          >
            <ArrowLeft className="size-4 md:size-8" />
            Вернуться в блог
          </Link>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge className="bg-gray-100 text-xl" key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className={`${rfDewiFont.className} text-3xl leading-tight font-bold md:text-5xl`}>
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500">
            <span>{post.date}</span>
            <span className="size-1 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative mb-12 aspect-video max-h-[700px] w-full overflow-hidden rounded-2xl bg-gray-100">
          <Image alt={post.title} className="object-cover" fill priority src={post.coverImage} />
        </div>

        <div className="mx-auto">
          <ContentRenderer blocks={post.content} />
        </div>
      </div>
    </Section>
  );
}
