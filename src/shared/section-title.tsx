import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import { rfDewiFont } from '@/app/fonts';

export default function SectionTitle({
  title,
  badgeTitle,
  titleClassName,
  badgeClassName,
  className,
  withBadge = true,
}: {
  title: string;
  badgeTitle?: string;
  titleClassName?: string;
  badgeClassName?: string;
  className?: string;
  withBadge?: boolean;
}) {
  return (
    <div className={cn('flex flex-col items-start gap-1 uppercase lg:gap-0', className)}>
      <h2
        className={cn(
          `text-left text-2xl font-semibold whitespace-normal text-black md:text-3xl lg:text-center lg:text-4xl`,
          titleClassName
        )}
      >
        {title}
      </h2>
      {withBadge && badgeTitle && (
        <Badge className={cn('bg-transparent px-0', badgeClassName)} variant="secondary">
          <span className={`${rfDewiFont.className} text-2xl font-bold md:text-3xl lg:text-4xl`}>
            {badgeTitle}
          </span>
        </Badge>
      )}
    </div>
  );
}
