import { Box, Section } from '@radix-ui/themes';

import { BlogCard } from '@/components/blog/blog-card';

import { BLOG_POSTS } from '@/entities/blog/data';
import SectionTitle from '@/shared/section-title';

export default function BlogPage() {
  return (
    <Section className="px-4 md:px-12">
      <Box>
        <div className="flex flex-col gap-10 pt-32">
          <SectionTitle badgeTitle="ПОЛЕЗНОЕ" title="БЛОГ И НОВОСТИ" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Box>
    </Section>
  );
}
