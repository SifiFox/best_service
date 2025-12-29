import Image from 'next/image';
import { JSX } from 'react';

import { cn } from '@/lib/utils';

import { rfDewiFont } from '@/app/fonts';
import { ContentBlock } from '@/entities/blog/data';

export const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => {
  return (
    <div className="flex flex-col gap-6 text-lg leading-relaxed text-gray-800">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'header': {
            const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            return (
              <Tag
                className={cn(
                  rfDewiFont.className,
                  'font-bold mt-4 mb-2',
                  block.data.level === 1 && 'text-4xl',
                  block.data.level === 2 && 'text-3xl',
                  block.data.level === 3 && 'text-2xl',
                  block.data.level > 3 && 'text-xl'
                )}
                key={index}
              >
                {block.data.text}
              </Tag>
            );
          }

          case 'paragraph':
            // block.content содержимое уже проходит очистку при сохранении
            // eslint-disable-next-line react/no-danger
            return <p dangerouslySetInnerHTML={{ __html: block.data.text }} key={index} />;

          case 'list': {
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag
                className={cn(
                  'pl-6 space-y-2',
                  block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'
                )}
                key={index}
              >
                {block.data.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
          }

          case 'quote':
            return (
              <figure
                className="my-6 border-l-4 border-primary bg-gray-50 p-6 rounded-r-lg"
                key={index}
              >
                <blockquote className="text-xl italic text-gray-900">
                  "{block.data.text}"
                </blockquote>
                {block.data.caption && (
                  <figcaption className="mt-4 text-sm text-gray-600 font-medium">
                    — {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'image':
            return (
              <div className="my-6" key={index}>
                <div
                  className={cn(
                    'relative aspect-video w-full overflow-hidden rounded-2xl',
                    block.data.withBorder && 'border border-gray-200',
                    block.data.stretched ? 'w-full' : 'max-w-3xl mx-auto'
                  )}
                >
                  <Image
                    alt={block.data.caption || 'Blog image'}
                    className="object-cover"
                    fill
                    src={block.data.url}
                  />
                </div>
                {block.data.caption && (
                  <p className="mt-2 text-center text-sm text-gray-500">{block.data.caption}</p>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
