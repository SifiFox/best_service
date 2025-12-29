import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { LinkArrow } from '@/components/ui/icons';

import { rfDewiFont } from '@/app/fonts';
import { BlogPost } from '@/entities/blog/data';

export const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link className="group flex flex-col gap-4" href={`/blog/${post.slug}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <Image
          alt={post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          src={post.coverImage}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {post.tags.map(tag => (
            <Badge className="bg-white/90 text-black hover:bg-white" key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{post.date}</span>
        </div>
        <h3
          className={`${rfDewiFont.className} text-xl font-bold group-hover:text-primary transition-colors`}
        >
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{post.description}</p>
        <div className="mt-2 flex items-center gap-2 text-primary font-medium">
          Читать статью
          <LinkArrow className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
